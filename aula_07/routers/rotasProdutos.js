const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Lista de produtos');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do produto com ID: ${id}`)
})

router.post('/', (req, res) => {
    const novoProduto = req.body;
    console.log('Usuário cadastrado: ', novoProduto);
    res.status(200).send('\n\nNovo produto cadastrado com sucesso!!!')
})

router.options('/', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send();
})

router.options('/:id', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send();
})

module.exports = router;