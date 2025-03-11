const express = require('express');
const fs = require('fs')
const rotaAdmin = require('./rotaAdmin');
const rotaGames = require('./rotaGames');
const app = express();
const port = 3000;

const logger = (req, res, next) => {
    const data = new Date();
    const acesso = `[${data.toISOString()}] ${req.method} ${req.url}`
    console.log(acesso)

    fs.appendFile('log.txt', `${acesso}\n`, err => {
        if (err) throw err
        console.log('Horário de acesso monitorado e gravado.')
    })
    next(); 
}
app.use(logger)

app.get('/', (req, res) => {
    res.status(200).send('<h1>Home Page</h1>')
})

app.use('/admin', rotaAdmin);
app.use('/games', rotaGames);
app.use((req, res) => {
    res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})