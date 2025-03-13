import axios from "axios";
import chalk from "chalk";

axios.get('https://jsonplaceholder.typicode.com/photos/99')
// axios.get('https://jsonplaceholder.typicode.com/todos/999')
    .then(response => {
        console.log(chalk.green.bold.underline('Dados recebidos com sucesso:'));
        console.log(response.data);
    })
    .catch(error => {
        console.error(chalk.bgYellow.bold('Ocorreu um erro: ', error.message))
        console.error(chalk.bgRed.bold('Código de status: ', error.response.status))
        console.error(chalk.red.bold('Status texto: ', error.response.statusText))
    })