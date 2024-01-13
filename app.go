package main

import (
	"context"
	"io"
	"os/exec"
)

type consoleState struct {
	output string
}

func (c *consoleState) Write(p []byte) (n int, err error) {
	c.output += string(p)
	return len(p), nil
}

type App struct {
	ctx          context.Context
	consoleState consoleState
	//reportsState string
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
	return a.consoleState.output
}

func (a *App) RunCommand(command string) {
	println("Running command: ", command)
	if command == "clear" {
		a.consoleState.output = ""
		return
	}

	cmd := exec.Command("sh", "-c", command)

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		logRunCommandError("Error creating StdoutPipe for Cmd: "+err.Error()+"\n", &a.consoleState)
		return
	}

	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		logRunCommandError("Error creating StderrPipe for Cmd: "+err.Error()+"\n", &a.consoleState)
		return
	}

	err = cmd.Start()
	if err != nil {
		logRunCommandError("Error starting Cmd: "+err.Error()+"\n", &a.consoleState)
		return
	}

	go func() {
		_, _ = io.Copy(&a.consoleState, stdoutPipe)
	}()

	go func() {
		_, _ = io.Copy(&a.consoleState, stderrPipe)
	}()

	err = cmd.Wait()
	if err != nil {
		logRunCommandError("Error running command: "+err.Error()+"\n", &a.consoleState)
	}
}

func logRunCommandError(s string, c *consoleState) {
	print(s)
	if c != nil {
		_, _ = c.Write([]byte(s))
	}
}
