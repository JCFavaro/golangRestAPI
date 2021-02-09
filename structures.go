package main

type task struct {
	ID      int    `json:"ID"`
	Name    string `json:"Name"`
	Content string `json:"Content"`
}

var tasks = allTasks{
	{
		ID:      1,
		Name:    "Test Task",
		Content: "Some first content for test",
	},
}

type allTasks []task
