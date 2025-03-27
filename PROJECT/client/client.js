import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';

const API_URL = 'http://localhost:3000'
async function listarRepositorio() {
    try {
        const response = await axios.get(`${API_URL}/repositorio`)
        return response.data
    } catch (error) {
        console.error(chalk.red.bold.underline('Erro ao listar jogos', error.message))
        return [];
    }
}

async function exibirDetalhesJogo(id) {
    try {
        const response = await axios.get(`${API_URL}/repositorio/${id}`)
        return response.data
    } catch (error) {
        console.error(chalk.red.bold.underline(`Erro ao listar o jogo com o ID: ${id}`, error.message))
        return null;
    }
}

async function postJogo() {
    const response = await axios.post(`${API_URL}/repositorio/`, {
        id: `${idJogo}`,
        nome: `${nomeJogo}`,
        instalado: `${instaladoJogo}`
    })

        .then(response => {
            console.log('Jogo recebido: ', response.data)
        })
        .catch(error => {
            console.log('Ocorreu um erro: ', error)
        })
}

async function exibirMenu() {
    const menuPrincipal = [
        {
            type: 'list',
            name: 'opcao',
            message: chalk.yellowBright.bold('\nEscolha uma opção:\n'),
            choices: [
                { name: chalk.cyanBright.bold('Listar repositório'), value: 'listar' },
                { name: chalk.cyanBright.bold('Exibir detalhes de um único jogo'), value: 'exibir' },
                { name: chalk.cyanBright.bold('Adicionar jogo'), value: 'post' },
                { name: chalk.cyanBright.bold('Alterar informações de algum jogo'), value: 'patch' },
                { name: chalk.yellow.bold('Excluir dados de algum jogo'), value: 'delete' },
                { name: chalk.redBright.bold.underline('Sair do programa'), value: 'sair' },

            ]
        }
    ]
    try {
        const resposta = await inquirer.prompt(menuPrincipal);

        switch (resposta.opcao) {
            case 'listar':
                const jogos = await listarRepositorio();
                if (Array.isArray(jogos) && (jogos.length > 0)) {
                    console.log(chalk.greenBright('Jogos da sua lista:'))
                    jogos.forEach(jogo => {
                        console.log(`${chalk.cyanBright(jogo.id)}: ${chalk.greenBright(jogo.nome)} Instalado: ${chalk.yellowBright.bold(jogo.instalado)}`)
                    })
                    console.log('\n\n')
                } else {
                    console.log(chalk.yellowBright.bold('Nenhum jogo encontrado'))
                }
                exibirMenu()
                break

            case 'exibir':
                const idResposta = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: chalk.blue('\nDigite o ID do produto: \n')
                    }
                ]);

                const jogo = await exibirDetalhesJogo(idResposta.id)
                if (jogo) {
                    console.log('\n\n')
                    console.log(chalk.greenBright.bold('Detalhes do jogo: '))
                    console.log(`${chalk.cyanBright(jogo.id)}: ${chalk.greenBright(jogo.nome)} - Instalado: ${chalk.yellowBright.bold(jogo.instalado)}`);
                    console.log('\n\n')
                } else {
                    console.log('\n\n')
                    console.log(chalk.yellowBright('Jogo não encontrado.'))
                    console.log('\n\n')
                }

                exibirMenu();
                break;

            case 'post':
                const jogoNovo = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: chalk.blue('\nCrie um ID para seu novo jogo\n')
                    },
                    {
                        type: 'input',
                        name: 'nome',
                        message: chalk.blue('\nQual o nome desse jogo?\n')
                    },
                    {
                        type: 'checkbox',
                        name: 'instalado',
                        message: chalk.blue('\nDeseja instalar?\n'),
                        choices: [
                            {name: 'SIM', value: 'Instalado'},
                            {name: 'NÃO', value: 'Salvo'}
                        ]
                    }
                ])

                const dadoNovo = jogoNovo.id + jogoNovo.nome + jogoNovo.instalado
                dadoNovo.push()

                fs.writeFileSync('../server/repoJogos.json', dadoNovo, 'utf8', (err) => {
                    if (err) throw err;
                })

        }
    } catch (error) {
        console.error(chalk.red('Ocorreu um erro inesperado', error))
    }
}

exibirMenu()