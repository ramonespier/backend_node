const axios = require('axios');

axios.patch("https://jsonplaceholder.typicode.com/todos/5", {
    title: "Jogar BloodStained",
})

    .then(response => {
        console.log("Dados recebidos: ", response.data);
    })

    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })

