package main

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

type Report struct {
	Name string `json:"name"`
	Date string `json:"date"`
	Size int64  `json:"size"`
}

func readReports() []Report {
	var reports []Report

	dir := "./reports/"

	files, err := ioutil.ReadDir(dir)
	if err != nil {
		logRunCommandError("Error reading reports directory, "+err.Error(), nil)
		return []Report{{Name: err.Error(), Date: "", Size: 0}}
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		reports = append(reports, Report{
			Name: file.Name(),
			Date: file.ModTime().String(),
			Size: file.Size(),
		})
	}

	if len(reports) == 0 {
		return []Report{{Name: "No reports found", Date: "", Size: 0}}
	}

	return reports
}

func readReport(name string) string {
	filePath := filepath.Join("./reports", name)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		logRunCommandError("Error reading report file, "+err.Error(), nil)
		return "File content ceases to exist"
	}

	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		logRunCommandError("Error reading report file, "+err.Error(), nil)
		return "File content ceases to exist"
	}

	return string(content)
}
