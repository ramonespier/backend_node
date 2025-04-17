import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
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
        console.error(chalk.red.bold.underline(`Jogo com o ID '${id}' não encontrado.`, error.message))
        return null;
    }
}

async function loginAdmin(id) {

    const authentic = {
        headers: {
            'authorization': "SEGREDO"
        }
    }

    try {
        const response = await axios.get(`${API_URL}/admin`, authentic)
        return response.data
    } catch (error) {
        console.error(chalk.red.bold.underline(`Jogo com o ID '${id}' não encontrado.`, error.message))
        return null;
    }
}

async function patchInfo(id, key, value) {
    const body = { [key]: value }

    try {
        await axios.patch(`${API_URL}/admin/${id}`, body, {
            headers: {
                'Authorization': 'SEGREDO',
                'Content-Type': 'application/json'
            }
        });
        console.log(chalk.green.bold('\n\nJogo alterado com sucesso!'));
    } catch (error) {
        console.error(chalk.red.underline('Insira um ID existente.\n'), error.message);
        exibirMenu()
    }
}

async function deleteInfo(id) {
    const resDelete = await axios.delete(`${API_URL}/admin/${id}`, {
        headers: {
            'Authorization': 'SEGREDO',
            'Content-Type': 'application/json'
        }
    });
    return resDelete.data;
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
                { name: chalk.yellowBright.bold('Modo de administrador'), value: 'admin' },
                { name: chalk.redBright.bold.underline('Sair do programa'), value: 'sair' },
            ]
        }
    ]

    async function menuAdmin() {
        const menuAdmin = [
            {
                type: 'list',
                name: 'opcaoAdm',
                message: chalk.yellowBright.bold('\nEscolha uma opção:\n'),
                choices: [
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
                            type: 'number',
                            name: 'id',
                            default: 0,
                            message: chalk.blue('\nDigite o ID do jogo: \n')
                        }
                    ]);

                    const jogo = await exibirDetalhesJogo(idResposta.id)
                    if (jogo) {
                        console.log('\n\n')
                        console.log(chalk.greenBright.bold('Detalhes do jogo: '))
                        console.log(`${chalk.cyanBright(jogo.id)}: ${chalk.greenBright(jogo.nome)} - Gênero: ${chalk.magentaBright.bold(jogo.genero)}`);
                        console.log('\n\n')
                    } else {
                        console.log('\n\n')
                        console.log(chalk.yellowBright('Jogo não encontrado.'))
                        console.log('\n\n')
                    }

                    exibirMenu();
                    break;

                case 'admin':
                    const autenticar = await inquirer.prompt([
                        {
                            type: 'password',
                            name: 'autenticar',
                            message: chalk.magentaBright.bold('Digite sua senha de administrador')
                        }
                    ])

                    if (autenticar.autenticar === 'SEGREDO') {
                        console.log(chalk.greenBright.bold('\nSenha correta. Acessando menu do administrador . . .\n'))

                        const sendAuntentica = await loginAdmin(1)
                        console.log(sendAuntentica)

                        const respostaAdm = await inquirer.prompt(menuAdmin);
                        switch (respostaAdm.opcaoAdm) {


                            case 'post':

                                const jogoNovo = await inquirer.prompt([

                                    {
                                        type: 'input',
                                        name: 'nome',
                                        message: chalk.blue('\nQual o nome desse jogo?\n')
                                    },
                                    {
                                        type: 'list',
                                        name: 'is_installed',
                                        message: chalk.blue('\nDeseja instalar?\n'),
                                        choices: [
                                            {
                                                name: chalk.magentaBright.bold("Sim"),
                                                value: true
                                            },
                                            {
                                                name: chalk.magentaBright.bold("Não"),
                                                value: false
                                            },

                                        ]
                                    },
                                    {
                                        type: 'input',
                                        name: 'genero',
                                        message: chalk.blue('\nQual o gênero desse jogo?\n'),
                                    }
                                ])
                                
                                    try {
                                        axios.post(`${API_URL}/admin`, jogoNovo, {
                                            headers: {
                                                'Authorization': 'SEGREDO',
                                                'Content-Type': 'application/json'
                                            }
                                        });
    
                                        console.log(chalk.greenBright.bold('Novo jogo salvo: ', jogoNovo.nome))
                                        // console.log(response.data)
    
                                    } catch (error) {
                                        console.error(chalk.red('Erro ao enviar para o servidor:'), error.message);
                                    }

                                exibirMenu()
                                break;

                            
                            case 'patch':
                                const patchJogo = await inquirer.prompt([
                                    {
                                        type: 'number',
                                        name: 'idJogo',
                                        default: 0,
                                        message: chalk.blueBright.bold('\nDigite o ID do jogo que deseja alterar informação: ')
                                    },
                                    {
                                        type: 'list',
                                        name: 'opcaoPatch',
                                        message: chalk.magentaBright.bold('Qual informação você deseja alterar?'),
                                        choices: [
                                            { name: chalk.cyanBright.bold('NOME'), value: 'nome', default: 'nome' },
                                            { name: chalk.cyanBright.bold('INSTALADO'), value: 'is_installed', default: 'SIM' },
                                            { name: chalk.cyanBright.bold('GÊNERO'), value: 'genero', default: 'Ação' },
                                        ]
                                    }
                                ])

                                switch (patchJogo.opcaoPatch) {
                                    case 'nome':
                                        const nomeNovo = await inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'nomeNovo',
                                                message: chalk.blue('\nDigite o nome novo desse jogo: ')
                                            }
                                        ])
                                        await patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, nomeNovo.nomeNovo);
                                        exibirMenu()
                                        break;

                                    case 'is_installed':
                                        const statusInstalado = await inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'statusInstalado',
                                                message: chalk.yellowBright.bold('\nSeu jogo continua instalado?'),
                                                choices: [
                                                    { name: 'Sim', value: true },
                                                    { name: 'Não', value: false },
                                                ]
                                            }
                                        ])
                                        patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, statusInstalado.statusInstalado)
                                        exibirMenu()
                                        break;

                                    case 'genero':
                                        const generoNovo = await inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'generoNovo',
                                                message: chalk.yellowBright.bold('\nAtualize os gêneros desse jogo.'),
    
                                            }
                                        ])
                                        patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, generoNovo.generoNovo)
                                        exibirMenu()
                                        break;
                                }

                                break;

                            case 'delete':
                                const excluirJogo = await inquirer.prompt([
                                    {
                                        type: 'number',
                                        name: 'id',
                                        default: 0,
                                        message: chalk.blue('\nDigite o ID do jogo a ser removido: ')
                                    }
                                ])

                                const id = parseInt(excluirJogo.id)                              

                                if (isNaN(id)) {
                                    console.log(chalk.red.bold('O ID deve ser um número inteiro'))
                                    exibirMenu()
                                    return;
                                }

                                try {
                                    await deleteInfo(excluirJogo.id)
                                    console.log(chalk.green.bold('\nJogo removido com sucesso!\n'));
                                    exibirMenu()
                                    return;

                                } catch (error) {
                                    console.log(chalk.red('Erro ao remover o jogo', error.message))
                                    exibirMenu()

                                }

                                break;

                            case 'sair':
                                console.log(chalk.magentaBright.bold('\n SAINDO DO SISTEMA . . . .'))
                                break;
                        }
                    } else {
                        console.log(chalk.red.underline('\nSenha incorreta\n'))
                        exibirMenu()
                        return;
                    }

                case 'sair':
                    console.log(chalk.magentaBright.bold('\n SAINDO DO SISTEMA . . . .'))
                    break;

            }
        } catch (error) {
            console.error(chalk.red('Ocorreu um erro inesperado', error))
        }
    }
    menuAdmin()
}
exibirMenu()
