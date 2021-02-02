package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// GET to /
func getTasks(w http.ResponseWriter, r *http.Request) {
	//to inform that I request / receive the data in JSON format
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(tasks)
}

// GET to /task/{id}
func getOneTask(w http.ResponseWriter, r *http.Request) {

	// Get the request variables (from URL)
	vars := mux.Vars(r)

	//I choose what variable from URL to pick
	taskID, err := strconv.Atoi(vars["id"])

	if err != nil {
		fmt.Fprintf(w, "Invalid ID")
		return
	}

	//We go through the list of tasks and look for the request ID
	for _, task := range tasks {
		if task.ID == taskID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(task)

			return
		}
	}

	//If the request ID wasn't found
	fmt.Fprintf(w, "ID not found")

}

// POST to /newTask
func createTask(w http.ResponseWriter, r *http.Request) {

	var newTask task

	// Read all input/output from request body
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Fprintf(w, "Insert a valid task")
	}

	//Assign reqBody value to newTask
	json.Unmarshal(reqBody, &newTask)

	//Generate automatically an ID as the index of the array where is stored that task + 1
	//If the tasks is in position 0, the ID will be 1
	newTask.ID = len(tasks) + 1

	tasks = append(tasks, newTask)

	//Respond a JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	//Return the entered task
	json.NewEncoder(w).Encode(newTask)
}

// DELETE to /task/{id}
func deleteTask(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	taskID, err := strconv.Atoi(vars["id"])

	if err != nil {
		fmt.Fprintf(w, "Invalid ID")
		return
	}

	for index, task := range tasks {
		if task.ID == taskID {
			//Concatenate the elements before the index with the ones after the index
			//[0, 1 , 2, 3, 4] if delete position 2 => [0, 1, 3, 4]
			tasks = append(tasks[:index], tasks[index+1:]...)
			fmt.Fprintf(w, "The task with ID %v has been remove succesfully", taskID)
			return
		}
	}

	fmt.Fprintf(w, "ID not found")
}

// PUT to /updateTask/{id}
func updateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	taskID, err := strconv.Atoi(vars["id"])

	var updatedTask task

	if err != nil {
		fmt.Fprintf(w, "Invalid ID")
		return
	}

	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Fprintf(w, "Please enter valid data")
		return
	}

	json.Unmarshal(reqBody, &updatedTask)

	for index, task := range tasks {
		if task.ID == taskID {
			//Take the tasks i had before, update ID and insert again
			tasks = append(tasks[:index], tasks[index+1:]...)
			updatedTask.ID = taskID
			tasks = append(tasks, updatedTask)

			fmt.Fprintf(w, "The task with ID %v has been updated succesfully", taskID)

			return
		}
	}

	fmt.Fprintf(w, "ID not found")
}
