package main

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"
)

// App struct
type App struct {
	ctx context.Context
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// CREATE A FUNCTION THAT RUNS OS ECHO COMMAND AND RETURNS THE OUTPUT/ERROR AND ANY OUTPUT AS A STRING
func (a *App) RunCommand(command string) (string, error) {
	cmd := exec.Command("sh", "-c", command)
	println("Running command: ", command)
	var outBuffer, errBuffer bytes.Buffer
	cmd.Stdout = &outBuffer
	cmd.Stderr = &errBuffer

	err := cmd.Run()
	println(err)
	if err != nil {
		return errBuffer.String(), nil
	}

	return outBuffer.String(), nil
}
