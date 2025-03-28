import axios from "axios";
import chalk from "chalk";

const token = 'SEGREDO'

axios.get('http://localhost:3000/admin',
    {
        headers: {
            "Authorization": token,
            "Accept": 'application/json'
        }
    })

    .then(response => {
        console.log(response.config.url)
        console.log(response.config.method)
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error.message)
    })