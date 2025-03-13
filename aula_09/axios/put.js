const axios = require('axios');

axios.put("https://jsonplaceholder.typicode.com/todos/5", {
    userId: 999,
    title: "Jogar Balatro",
    complete: false
})

    .then(response => {
        console.log("ToDo atualizado: ", response.data);
    })

    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })

