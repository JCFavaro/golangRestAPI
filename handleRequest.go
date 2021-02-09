package main

import (
	//If server isn't created correctly
	"log"

	//To create HTTP server
	"net/http"

	// This help to make CRUD functionality
	"github.com/gorilla/mux"

	"github.com/rs/cors"
)

func handleRequest() {

	// Force you to enter the URL correctly
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", getTasks).Methods("GET")

	router.HandleFunc("/newTask", createTask).Methods("POST")

	router.HandleFunc("/task/{id}", getOneTask).Methods("GET")

	router.HandleFunc("/task/{id}", deleteTask).Methods("DELETE")

	router.HandleFunc("/updateTask/{id}", updateTask).Methods("PUT")

	// To enable CORS, ALL methods and headers are allows
	handler := cors.AllowAll().Handler(router)
	/**
	*	To create the server
	*	First parameter: port
	*	Second parameter: Router we have defined
	*	log.fatal if the server isn't create, give me an error
	**/
	log.Fatal(http.ListenAndServe(":8080", handler))
}
