const express = require("express");
const fs = require('fs')
const router = express.Router()

let jogos = []

try {
    const data = fs.readFileSync('../repoJogos.json', 'utf8')
    jogos = JSON.parse(data)
} catch (error) {
    console.log('Ocorreu um erro ao tentar ler o arquivo repoJogos.json', error)
}

router.get('/', (req, res) => {
    // res.status(200).send('Repósitorio de Jogos')
    res.json(jogos);
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const jogo = jogos.find(p => p.id === id)
    if (jogo) {
        res.json(jogo)
    } else {
        res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
    }
})

router.post('/', (req, res) => {
    const novoJogo = req.body;
    console.log('Produto cadastrado: ', novoJogo)
    res.status(201).send("Novo produto cadastrado com sucesso!")
})

router.options('/', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send()
})

router.options('/:id', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send()
})

module.exports = router;