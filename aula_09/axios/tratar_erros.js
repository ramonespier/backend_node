const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/todos/999')
    .then(response => {
        console.log('Dados recebidos: ', response.data);
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error.message)
        console.error('Código de status: ', error.response.status)
        console.error('Status texto: ', error.response.statusText)
    })