fetch('http://localhost:8080/').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response

	var tblBody = document.getElementById("tbody");

	for (var i = 0; i < data.length; i++) {

		var hilera = document.createElement("tr");

		var th = document.createElement("th");

		th.setAttribute("scope", "row");

		th.innerHTML = i;

		hilera.appendChild(th);

		var celda1 = document.createElement("td");
		var celda2 = document.createElement("td");

		for (var j = 0; j < 3; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla

			var nombreCelda = document.createTextNode(data[i].Name);

			var contenidoCelda = document.createTextNode(data[i].Content);

		}

		celda1.appendChild(nombreCelda);
		hilera.appendChild(celda1);

		celda2.appendChild(contenidoCelda);
		hilera.appendChild(celda2);

		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
	}

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

