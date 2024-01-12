package main

import (
	"context"
	"io"
	"os/exec"
)

type consoleState struct {
	output    string
	isRunning bool
}

type App struct {
	ctx          context.Context
	consoleState consoleState
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetConsoleOutput() string {
	println(a.consoleState.output)
	return a.consoleState.output
}

func (a *App) GetConsoleIsRunning() bool {
	return a.consoleState.isRunning
}

func (a *App) RunCommand(command string) {
	cmd := exec.Command("sh", "-c", command)
	println("Running command: ", command)
	a.consoleState.isRunning = true

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		a.consoleState.output = "Error creating StdoutPipe for Cmd: " + err.Error()
		return
	}

	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		a.consoleState.output = "Error creating StderrPipe for Cmd: " + err.Error()
		return
	}

	err = cmd.Start()
	if err != nil {
		a.consoleState.output = "Error starting Cmd: " + err.Error()
		return
	}

	go func() {
		io.Copy(&outputWriter{app: a}, stdoutPipe)
	}()

	go func() {
		io.Copy(&outputWriter{app: a}, stderrPipe)
	}()

	err = cmd.Wait()
	println(err)
	a.consoleState.isRunning = false
	if err != nil {
		a.consoleState.output += "Error waiting for Cmd: " + err.Error()
	}
}

type outputWriter struct {
	app *App
}

func (w *outputWriter) Write(p []byte) (n int, err error) {
	w.app.consoleState.output += string(p)
	return len(p), nil
}
