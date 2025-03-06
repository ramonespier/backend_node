const express = require('express');
const app = express(); // aplicação
const port = 3000; // porta do server

app.use(express.json()); // middleware para JSON  
app.use(express.urlencoded({extended: true})); // Middleware para dados de formulário   

app.get('/', (req, res) => {
    res.send(('<h1>Hello world!</h1>'));
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do usuário com o ID: ${id}`)
})

//teste de resultado de busca e-commerce;
app.get('/busca/:busca', (req, res) => {
    const busca = req.params.busca;
    res.send(`Resultados de busca para "${busca}"`)
})

app.get('/categorias/:categoria/produtos/:produto', (req, res) => {
    const categoria = req.params.categoria;
    const produto = req.params.produto;
    res.send(`Categoria: ${categoria}, Produto: ${produto}`)
})

app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    console.log('Produto cadastrado: ', novoProduto)
    res.status(200).send('\n\nProduto cadastrado com sucesso!!!')
    // res.json(novoProduto);
})

app.options('/produtos', (req, res) => {
    res.header('Allow', 'POST')
    res.status(204).send();
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})  