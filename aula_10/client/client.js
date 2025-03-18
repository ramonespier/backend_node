import inquirer from "inquirer";
import chalk from "chalk";
import axios from "axios";

const API_URL = 'http://localhost:3000';
async function listarProdutos() {
    try {
        const response = await axios.get(`${API_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error(chalk.red.bold.underline('Erro ao listar produtos:'), error.message)
        return [];
    }
}

async function exibirDetalhesProduto(id) {
    try {
        const response = await axios.get(`${API_URL}/produtos/${id}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red.bold.underline(`Erro ao exibir detalhes do produto com ID: ${id} `), error.message)
        return null;
    }
}

async function exibirMenu() {
    const perguntas = [
        {
            type: 'list',
            name: 'opcao',
            message: chalk.yellow.bold('Escolha uma opção: '),
            choices: [
                { name: chalk.greenBright('Listar produtos'), value: 'listar' },
                { name: chalk.greenBright('Exibir detalhes do produto'), value: 'exibir' },
                { name: chalk.red('Sair'), value: 'sair' }
            ]
        },
        // {
        //     type: 'list',
        //     name: 'selecionarProduto',
        //     message: chalk.yellowBright('Selecione um produto: '),
        //     choices: [
        //         { name: chalk.cyan.bold('Calça'), value: 'calca', id: 1 },
        //         { name: chalk.cyan.bold('Camiseta'), value: 'camiseta', id: 2 },
        //         { name: chalk.cyan.bold('Meia'), value: 'meia', id: 3 },
        //         { name: chalk.cyan.bold('Boné'), value: 'bone', id: 4 }
        //     ]
        // }
    ];

    try {
        const resposta = await inquirer.prompt(perguntas);
        switch (resposta.opcao) {
            case 'listar':
                const produtos = await listarProdutos();
                console.log(produtos);
                exibirMenu();
                break

            case 'exibir':
                const idResposta = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: chalk.blue('\nDigite o ID do produto: \n')
                    }
                ]);

                const produto = await exibirDetalhesProduto(idResposta.id)
                console.log('\n', produto, '\n');
                exibirMenu();
                break;

            case 'sair':
                console.log(chalk.cyan('Saindo do sistema. . . . . .'));
                break

        }
    } catch (error) {
        console.error(chalk.red('Ocorreu um erro inesperado', error))
    }

    // try {
    //     const resposta = await inquirer.prompt(perguntas);
    //     switch (resposta.selecionarProduto) {
    //         case 'calca':
    //         const 
    //     }

    // } catch {

    // }
}
    

exibirMenu();