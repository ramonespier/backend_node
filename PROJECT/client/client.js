import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';

const data = fs.readFileSync('../server/repoJogos.json', 'utf8')
const dados = JSON.parse(data)

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
        console.error(chalk.red.bold.underline(`Produto com o ID '${id}' não encontrado.`, error.message))
        return null;
    }
}

async function debugAdmin(id) {

    const authentic = {
        headers: {
            'authorization': "SEGREDO"
        }
    }

    try {
        const response = await axios.get(`${API_URL}/admin`, authentic)
        return response.data
    } catch (error) {
        console.error(chalk.red.bold.underline(`Produto com o ID '${id}' não encontrado.`, error.message))
        return null;
    }
}
async function patchInfo(id, key, value) {
    const body = { body: { key: key, value: value } }
    // id = patchJogo.idJogo
    axios.patch(`${API_URL}/admin/${id}`, body, {
        headers: {
            'Authorization': 'SEGREDO',
            'Content-Type': 'application/json'
        }
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

                        const sendAuntentica = await debugAdmin(1)
                        console.log(sendAuntentica)

                        const respostaAdm = await inquirer.prompt(menuAdmin);
                        switch (respostaAdm.opcaoAdm) {

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
                                    console.log(`${chalk.cyanBright(jogo.id)}: ${chalk.greenBright(jogo.nome)} - Gênero: ${chalk.magentaBright.bold(jogo.genero)}`);
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
                                        type: 'list',
                                        name: 'instalado',
                                        message: chalk.blue('\nDeseja instalar?\n'),
                                        choices: [
                                            {
                                                name: "Sim",
                                                value: "Sim"
                                            },
                                            {
                                                name: "Não",
                                                value: "Não"
                                            },

                                        ]
                                    },
                                    {
                                        type: 'checkbox',
                                        name: 'genero',
                                        message: chalk.blue('\nQual o gênero desse jogo?\n'),
                                        choices: [
                                            {
                                                name: "Ação", value: "Ação",
                                            },
                                            {
                                                name: "Aventura", value: "Aventura",
                                            },
                                            {
                                                name: "RPG", value: "RPG",
                                            },
                                            {
                                                name: "MMORPG", value: "MMORPG",
                                            },
                                            {
                                                name: "Estratégia", value: "Estratégia",
                                            },
                                            {
                                                name: "Simualação", value: "Simualação",
                                            },
                                            {
                                                name: "Esportes", value: "Esportes",
                                            },
                                            {
                                                name: "Luta", value: "Luta",
                                            },
                                            {
                                                name: "Terror", value: "Terror",
                                            },
                                            {
                                                name: "Plataforma", value: "Plataforma",
                                            },
                                            {
                                                name: "Puzzle", value: "Puzzle",
                                            },
                                            {
                                                name: "Hack'n'slash", value: "Hack'n'slash",
                                            },
                                            {
                                                name: "Battle Royale", value: "Battle Royale",
                                            },
                                            {
                                                name: "Musical", value: "Musical",
                                            },
                                        ]
                                    }
                                ])

                                try {

                                    jogoNovo.id = parseInt(jogoNovo.id)
                                    if (isNaN(jogoNovo.id)) {
                                        console.log(chalk.yellow.bold('O ID deve ser um número inteiro'))
                                        exibirMenu()
                                        return;
                                    }
                                    if (dados.some(jogo => jogo.id === jogoNovo.id)) {
                                        console.log(chalk.yellow.bold("    Impossível criar um produto com ID já existente.\n    Verifique a lista de jogos e veja quais ID's voce pode usar."));
                                        exibirMenu()
                                        return;
                                        // A função some() executa a função callback uma vez para cada elemento do array até encontrar aquele em que a função callback retorne true. Então o método some() retorna true imediatamente e não avalia os elementos restantes.Se nenhum elemento fizer a função callback retornar true, o método some() vai retornar false. 
                                        // medium.com

                                    } else {
                                        dados.push(jogoNovo);
                                        const jsonData = JSON.stringify(dados, null, 2);
                                        console.log(chalk.greenBright.bold('Jogo adicionado ao repositório com sucesso!'));
                                        fs.writeFileSync('../server/repoJogos.json', jsonData);
                                        exibirMenu()

                                    }

                                    axios.post(`${API_URL}/admin`, jogoNovo, {
                                        headers: {
                                            'Authorization': 'SEGREDO',
                                            'Content-Type': 'application/json'
                                        }
                                    });

                                    console.log(chalk.greenBright.bold('\n\n\nJogo adicionado:'), jogoNovo.nome);
                                    // console.log(response.data)

                                } catch (error) {
                                    console.error(chalk.red('Erro ao enviar para o servidor:'), error.message);
                                }
                                exibirMenu()
                                break;

                            case 'patch':
                                const patchJogo = await inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'idJogo',
                                        message: chalk.blue('\nDigite o ID do jogo que deseja alterar informação: ')
                                    },
                                    {
                                        type: 'list',
                                        name: 'opcaoPatch',
                                        message: chalk.cyanBright.bold('Qual informação você deseja alterar?'),
                                        choices: [
                                            { name: 'Nome: ', value: 'nome' },
                                            { name: 'Instalado? ', value: 'instalado' },
                                            { name: 'Gênero: ', value: 'genero' },
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
                                        patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, nomeNovo.nomeNovo)
                                        break;

                                    case 'instalado':
                                        const statusInstalado = await inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'statusInstalado',
                                                message: chalk.yellowBright.bold('\nSeu jogo continua instalado?'),
                                                choices: [
                                                    { name: 'Sim', value: 'sim' },
                                                    { name: 'Não', value: 'nao' },
                                                ]
                                            }
                                        ])
                                        patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, statusInstalado.statusInstalado)
                                        break;

                                    case 'genero':
                                        const generoNovo = await inquirer.prompt([
                                            {
                                                type: 'checkbox',
                                                name: 'generoNovo',
                                                message: chalk.yellowBright.bold('\nAtualize os gêneros desse jogo.'),
                                                choices: [
                                                    {
                                                        name: "Ação", value: "Ação",
                                                    },
                                                    {
                                                        name: "Aventura", value: "Aventura",
                                                    },
                                                    {
                                                        name: "RPG", value: "RPG",
                                                    },
                                                    {
                                                        name: "MMORPG", value: "MMORPG",
                                                    },
                                                    {
                                                        name: "Estratégia", value: "Estratégia",
                                                    },
                                                    {
                                                        name: "Simualação", value: "Simualação",
                                                    },
                                                    {
                                                        name: "Esportes", value: "Esportes",
                                                    },
                                                    {
                                                        name: "Luta", value: "Luta",
                                                    },
                                                    {
                                                        name: "Terror", value: "Terror",
                                                    },
                                                    {
                                                        name: "Plataforma", value: "Plataforma",
                                                    },
                                                    {
                                                        name: "Puzzle", value: "Puzzle",
                                                    },
                                                    {
                                                        name: "Hack'n'slash", value: "Hack'n'slash",
                                                    },
                                                    {
                                                        name: "Battle Royale", value: "Battle Royale",
                                                    },
                                                    {
                                                        name: "Musical", value: "Musical",
                                                    },
                                                ]
                                            }
                                        ])
                                        patchInfo(patchJogo.idJogo, patchJogo.opcaoPatch, generoNovo.generoNovo)
                                        break;


                                }
                            // patchJogo.idJogo = parseInt(patchJogo.idJogo)


                        }
                    } else {
                        console.log(chalk.red.underline('\nSenha incorreta\n'))
                    }


            }
        } catch (error) {
            console.error(chalk.red('Ocorreu um erro inesperado', error))
        }
    }
    menuAdmin()
}
exibirMenu();
