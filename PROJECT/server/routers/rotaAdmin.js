const express = require('express')
const fs = require('fs')
const router = express.Router()

router.use(express.json())

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

module.exports = router