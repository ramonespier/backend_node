const express = require("express");
const fs = require("fs");
const rotaRepositorio = require('./rotaRepositorio')
const rotaAdmin = require('./autenticacao')
const app = express();
const port = 3000;

let jogos = [];

try {
    const data = fs.readFileSync('../repoJogos.json', 'utf8')
    jogos = JSON.parse(data)
} catch (error){
    console.error('Erro ao ler o arquivo repoJogos.json', error)
    jogos = [];
}

app.use('/repositorio', rotaRepositorio);
app.use('/repositorio/:id', rotaRepositorio);
app.use('/admin', rotaAdmin)
app.use((req, res) => {
    res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>HOME</h1>')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})