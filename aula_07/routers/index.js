const express = require('express');
const app = express();
const rotasUsuarios = require('./rotasUsuarios')
const rotasProdutos = require('./rotasProdutos')
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.status(200).send('<h1>Home Page</h1>')
})

app.use('/usuarios', rotasUsuarios);
app.use('/produtos', rotasProdutos);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});