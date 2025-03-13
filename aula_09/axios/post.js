const axios = require('axios');

axios.post("https://jsonplaceholder.typicode.com/todos/", {
    userId: 999,
    title: "Jogar vava",
    complete: true
})

    .then(response => {
        console.log("ToDo recebido: ", response.data);
    })

    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })

