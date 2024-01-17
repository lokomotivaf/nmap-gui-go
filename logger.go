package main

func logRunCommandError(s string, c *consoleState) {
	print(s)
	if c != nil {
		_, _ = c.Write([]byte(s))
	}
}
