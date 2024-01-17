package main

import (
	"context"
	"encoding/json"
	"io"
	"os/exec"
)

type App struct {
	ctx          context.Context
	consoleState consoleState
}

type consoleState struct {
	output string
}

func (c *consoleState) Write(p []byte) (n int, err error) {
	c.output += string(p)
	return len(p), nil
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetReports exported for use in frontend
func (a *App) GetReports() (string, error) {
	reports := readReports()

	jsonData, err := json.Marshal(reports)
	if err != nil {
		logRunCommandError("Error marshalling reports list to JSON: "+err.Error()+"\n", nil)
		return "", err
	}

	return string(jsonData), nil
}

// GetReport exported for use in frontend
func (a *App) GetReport(name string) (string, error) {
	return readReport(name), nil
}

// GetConsoleOutput exported for use in frontend
func (a *App) GetConsoleOutput() string {
	return a.consoleState.output
}

// RunCommand exported for use in frontend
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
