const express = require('express');
const router = express.Router()
const games = [
    { id: 1, nome: "Valorant" },
    { id: 2, nome: "Balatro" },
    { id: 3, nome: "Celeste" }
];

router.get('/', (req, res) => {
    res.status(200).send(games)

})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id === id)

    if(game) {
        res.send(`Detalhes do jogo com ID: ${id}`)

    } else {
        res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
    }
});

router.post('/', (req, res) => {
    const novoGame = req.body;
    console.log('Jogo adicionado: ', novoGame);
    res.status(200).send('Jogo adicionado com sucesso!');
})

// curl OPTIONS

router.options('/', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send();
})

router.options('/:id', (req, res) => {
    res.header('Allow', 'POST');
    res.status(204).send();
})

module.exports = router
