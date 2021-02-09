
var tblBody = document.getElementById("tbody");

var celda1 = document.createElement("td");
var celda2 = document.createElement("td");
var celda3 = document.createElement("td");

var deleteButton = document.createElement("a");
deleteButton.setAttribute("class", "btn btn-danger btn-sm");


//Retorno todas las tareas y las coloco en la tabla
fetch('http://localhost:8080/').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response

	for (var i = 0; i < data.length; i++) {

		var hilera = document.createElement("tr");

		var th = document.createElement("th");

		th.setAttribute("scope", "row");

		th.innerHTML = i;

		hilera.appendChild(th);

		for (var j = 0; j < 3; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla

			var nombreCelda = document.createTextNode(data[i].Name);

			var contenidoCelda = document.createTextNode(data[i].Content);

			deleteButton.innerText = 'Delete';
			deleteButton.setAttribute("id", i + 1);

		}

		celda1.appendChild(nombreCelda);
		hilera.appendChild(celda1);

		celda2.appendChild(contenidoCelda);
		hilera.appendChild(celda2);

		celda3.appendChild(deleteButton);
		hilera.appendChild(celda3);

		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
	}

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});


// Delete Method

class DeleteHTTP {

	// Make an HTTP PUT Request 
	async delete(url) {

		// Awaiting fetch which contains  
		// method, headers and content-type 
		await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json'
			}
		});

		// Awaiting for the resource to be deleted 
		const resData = await 'Resource Deleted...';

		// Return response data  
		return resData;
	}
}

const http = new DeleteHTTP;


deleteButton.addEventListener("click", function () {
	// Update Post 
	http.delete('http://localhost:8080/task/' + this.id)

		// Resolving promise for response data 
		.then(data => {
			console.log(data);
			location.reload();
		})

		// Resolving promise for error 
		.catch(err => console.log(err));

	console.log('response deleted...');

	
})
