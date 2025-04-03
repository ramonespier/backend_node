const express = require('express')
const fs = require('fs')
const router = express.Router()

router.use(express.json())

const data = fs.readFileSync('../repoJogos.json', 'utf8')
const dados = JSON.parse(data)

const autenticar = (req, res, next) => {
    const token = req.headers['authorization']
    if (token === 'SEGREDO') {
        // router.send('Usuario autenticado como admin')
        next()
    } else {
        res.status(401).send('<h1 style="color: red;">ERRO 401</h1><br><p style="font-weight:bold;">Sem autorização</p>')
    }
}

const logger = (req, res, next) => {
    const data = new Date();
    console.log(`[${data.toISOString()}] ${req.method} ${req.url}`);
    next()
}

router.use(logger)

router.get('/', autenticar, (req, res) => {
    res.status(200).send('Painel de controle liberado.')
    console.log("MODO DE ADMINISTRADOR ACESSADO")
})

router.options('/', autenticar, (req, res) => {
    res.header('Allow', 'GET, POST, DELETE, PATCH');
    res.status(204).send()
})

router.post('/', autenticar, (req, res) => {
    const novoJogo = req.body;//pode ter mis 
    console.log("Novo jogo cadastrado:", novoJogo)

    try {
        let jsonData = []
        const id = req.body.id;
        console.log(id)
        const caminho = '../repoJogos.json';
        jsonData = JSON.parse(fs.readFileSync(caminho, 'utf8'));
        const adicionar = jsonData.find(game => game.id === id); //TRUE 

        if(adicionar) {
            console.log("2")
        } else {
            jsonData.push(novoJogo)
            console.log("1")
            fs.writeFileSync(caminho, JSON.stringify(jsonData, null, 2), 'utf8');
            res.send('Jogo adicionado com sucesso!');
        }

    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).send('Erro ao remover jogo');
    }
});

router.patch('/:id', autenticar, (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            console.log('Tentativa de PATCH /// ID INVÁLIDO')
        }
        const dados = fs.readFileSync('../repoJogos.json', 'utf8')
        const dadosTexto = JSON.parse(dados)
        const jogoIndex = dadosTexto.findIndex(p => p.id === id)

        if (jogoIndex === -1) {
            res.status(404).json({ error: 'Esse jogo não existe no repósitorio' })
            return
        }

        dadosTexto[jogoIndex] = {
            ...dadosTexto[jogoIndex], // "..." (SPREAD OPERATOR) serve para criar e depois sobrescrever um novo objeto
            ...req.body
        }

        const jsonData = JSON.stringify(dadosTexto, null, 2)
        fs.writeFileSync('../repoJogos.json', jsonData, 'utf-8');

        res.json(dadosTexto[jogoIndex])

    } catch (error) {
        console.error('Erro ao atualizar:', error);
    }
})

router.delete('/:id', autenticar, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const caminho = '../repoJogos.json';
        const data = JSON.parse(fs.readFileSync(caminho, 'utf8'));
        const deletar = data.filter(game => game.id !== id);

        fs.writeFileSync(caminho, JSON.stringify(deletar, null, 2));
        res.send('Jogo removido com sucesso!');

    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).send('Erro ao remover jogo');
    }
});

module.exports = router