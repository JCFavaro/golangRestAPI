var sendButton = document.getElementById('postForm');

sendButton.addEventListener('submit', e => {
    e.preventDefault();

    fetch('https://rest-go-api.herokuapp.com/newTask', {
        method: 'POST',
        body: JSON.stringify({
            Name: e.target[0].value,
            Content:  e.target[2].value,
        }),
        headers: {
            'Content-type': 'application/json' // The type of data you're sending
        }
    }).then(function (response) {
        if (response.ok) {
            window.location.href = "/"
            return response.json();
        }
        return Promise.reject(response);
    })
    .catch(function (error) {
        console.warn('Something went wrong.', error);
    });
})

