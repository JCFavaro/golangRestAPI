var tblBody = document.getElementById("tbody");


// GET METHOD, return all tasks and put on the table
fetch('https://rest-go-api.herokuapp.com/').then(function (response) {

	// The API call was successful!
	return response.json();

}).then(function (data) {

	//For every task that exist
	for (var i = 0; i < data.length; i++) {

		var th = document.createElement("th");

		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");

		var deleteButton = document.createElement("a");
		var updateButton = document.createElement("a");

		var row = document.createElement("tr");

		th.setAttribute("scope", "row");

		th.innerHTML = i + 1;

		cell3.setAttribute("class", "d-flex justify-content-evenly");

		deleteButton.setAttribute("class", "btn btn-danger btn-sm");
		updateButton.setAttribute("class", "btn btn-primary btn-sm");

		row.appendChild(th);

		// 3 is the attributes numbers
		for (var j = 0; j < 3; j++) {
			var cellName = document.createTextNode(data[i].Name);

			var contentCell = document.createTextNode(data[i].Content);

			updateButton.innerText = 'Update';
			updateButton.setAttribute("id", data[i].ID);

			deleteButton.innerText = 'Delete';
			deleteButton.setAttribute("id", data[i].ID);

		}

		cell1.appendChild(cellName);
		row.appendChild(cell1);

		cell2.appendChild(contentCell);
		row.appendChild(cell2);

		cell3.appendChild(updateButton);
		cell3.appendChild(deleteButton);
		row.appendChild(cell3);

		//Add the row to the end of the table
		tblBody.appendChild(row);


		// Delete method and the ID rearranges
		deleteButton.addEventListener("click", deleteTask);
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

function deleteTask() {

	// Update Post 
	http.delete('https://rest-go-api.herokuapp.com/task/' + this.id)

		// Resolving promise for response data 
		.then(data => {
			console.log(data);
			//Refresh page after delete task
			location.reload();
		})

		// Resolving promise for error 
		.catch(err => console.log(err));

	console.log('response deleted...');
}
