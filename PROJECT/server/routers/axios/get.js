import axios from "axios";
import chalk from "chalk";

const token = 'SEGREDO'

axios.get('http://localhost:3000/admin', 
    { headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": 'application/json'
    }
    })

    .then(response => {
        console.log(response.data.url)
        console.log(response.data.explanation)
        console.log('Dados recebidos: ', response.data)
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error.data)
    })