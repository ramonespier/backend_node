const express = require('express')
const fs = require('fs')
const router = express.Router()

router.use(express.json())

function deletarJogo(id) {
    try{
        let naoDelete = [];
        const AllData = fs.readFileSync('../repoJogos.json', 'utf8');
        const allDataJson = JSON.parse(AllData);
        naoDelete = allDataJson.filter(p => p.id !== id)
        fs.writeFileSync('../repoJogos.json', JSON.stringify(naoDelete, null, 2))
    } catch (err) {
        console.error('Houve um erro ao ler e deletar o jogo do repositório.', err)
    }
}

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
    const novoJogo = req.body;
    console.log("Novo jogo cadastrado:", novoJogo)
})

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