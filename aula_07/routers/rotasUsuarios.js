const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Lista de usuários');
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do usuário com ID: ${id}`)
})

router.post('/', (req, res) => {
    const novoUsuario = req.body;
    console.log('Usuário cadastrado: ', novoUsuario);
    res.status(200).send('\n\nCadastro realizado com sucesso!!!')
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