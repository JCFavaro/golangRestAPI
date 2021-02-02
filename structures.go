package main

type task struct {
	ID      int    `json:"ID"`
	Name    string `json:"Name"`
	Content string `json:"Content"`
}

var tasks = allTasks{
	{
		ID:      1,
		Name:    "Task one",
		Content: "Some first content",
	},
}

type allTasks []task
