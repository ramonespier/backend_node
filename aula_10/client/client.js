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
    const menuPrincipal = [
        {
            type: 'list',
            name: 'opcao',
            message: chalk.yellow.bold('Escolha uma opção: '),
            choices: [
                { name: chalk.greenBright('Listar produtos'), value: 'listar' },
                { name: chalk.greenBright('Exibir detalhes do produto'), value: 'exibir' },
                { name: chalk.red('Sair'), value: 'sair' }
            ]
        }
    ];

    try {
        const resposta = await inquirer.prompt(menuPrincipal);
        switch (resposta.opcao) {
            case 'listar':
                const produtos = await listarProdutos();
                if (Array.isArray(produtos) && produtos.length > 0) {
                    console.log(chalk.green('Lista de produtos: '));
                    console.log('\n\n')
                    produtos.forEach(produto => {
                        console.log(`${chalk.cyanBright(produto.id)}: ${chalk.greenBright(produto.nome)} - R$ ${chalk.yellowBright.bold(produto.preco)}`);
                    });
                    console.log('\n\n')
                } else {
                    console.log(chalk.yellowBright.bold('Nenhum produto encontrado.'))
                }

                exibirMenu();
                break

            case 'exibir':
                const menuProdutos = [
                    {
                        type: 'list',
                        name: 'selecionarProduto',
                        message: chalk.yellowBright('\nSelecione um produto: '),
                        choices: [
                            { name: chalk.cyan.bold('Calça'), value: 1 },
                            { name: chalk.cyan.bold('Camiseta'), value: 2 },
                            { name: chalk.cyan.bold('Meia'), value: 3 },
                            { name: chalk.cyan.bold('Boné'), value: 4 }
                        ]
                    }
                ]

                const respostaProduto = await inquirer.prompt(menuProdutos);
                const idProduto = respostaProduto.selecionarProduto;

                const detalhes = await exibirDetalhesProduto(idProduto);
                console.log('\n\n')
                console.log(chalk.greenBright.bold('Detalhes do produto:'))
                console.log(`${chalk.cyanBright(detalhes.id)}: ${chalk.greenBright(detalhes.nome)} - R$ ${chalk.yellowBright.bold(detalhes.preco)}`);
                console.log('\n\n')
                exibirMenu();
                break;

                // const idResposta = await inquirer.prompt([
                //     {
                //         type: 'input',
                //         name: 'id',
                //         message: chalk.blue('\nDigite o ID do produto: \n')
                //     }
                // ]);

                // const produto = await exibirDetalhesProduto(idResposta.id)
                // if (produto) {
                //     console.log('\n\n')
                //     console.log(chalk.greenBright.bold('Detalhes do produto: '))
                //     console.log(`${chalk.cyanBright(produto.id)}: ${chalk.greenBright(produto.nome)} - R$ ${chalk.yellowBright.bold(produto.preco)}`);
                //     console.log('\n\n')
                // } else {
                //     console.log('\n\n')
                //     console.log(chalk.yellowBright('Produto não encontrado.'))
                //     console.log('\n\n')
                // }

                // exibirMenu();
                // break;

            case 'sair':
                console.log(chalk.cyan('Saindo do sistema . . . . . .'));
                break

        }
    } catch (error) {
        console.error(chalk.red('Ocorreu um erro inesperado', error))
    }
}


exibirMenu();