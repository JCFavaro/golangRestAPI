var sendButton = document.getElementById('postForm');

sendButton.addEventListener('submit', e => {
    e.preventDefault();

    fetch('http://localhost:8080/newTask', {
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
            window.location.href = "http://127.0.0.1:5500/frontend/index.html"
            return response.json();
        }
        return Promise.reject(response);
    })
    .catch(function (error) {
        console.warn('Something went wrong.', error);
    });
})

