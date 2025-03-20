import axios from "axios";
import chalk from "chalk";

const token = 'SEGREDO'

axios.get('http://localhost:3000/admin', { headers: {"Authorization": `Bearer: ${token}`}})
    .then(response => {
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error.data)
    })