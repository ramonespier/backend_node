const express = require('express')
const fs = require('fs')
const router = express.Router()

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
    res.status(200).send('<h1>Painel de controle</h1>')
    console.log("MODO DE ADMINISTRADOR ACESSADO") // ---------------------------- TESTE PARA ESREVER NO SERVER
})

router.post('/', autenticar, (req, res) => {
    const novoJogo = req.body;
    res.status(201).send('Produto cadastrado: ', novoJogo)
    res.status(201).send("Novo produto cadastrado com sucesso!")
})

router.options('/', autenticar, (req, res) => {
    res.header('Allow', 'GET, POST, DELETE, PATCH');
    res.status(204).send()
})


module.exports = router