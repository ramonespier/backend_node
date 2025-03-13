const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/photos/99')
    .then(response => {
        console.log('Dados recebidos: ', response.data);
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })