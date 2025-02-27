const express = require('express');
const app = express(); // aplicação
const port = 3000; // porta do server
const produtos = [
    { id: 1, nome: "Bis", preço: 11.00 },
    { id: 2, nome: "Twix", preço: 3.50 },
    { id: 3, nome: "Trento", preço: 4.00 },
    { id: 4, nome: "Hersheys", preço: 8.50 },
    { id: 5, nome: "Ouro Branco", preço: 1.50 }
]

// começo url
app.get('/', (req, res) => {
    res.send(('<h1>Página Inicial</h1>')); // entende automaticamente o tipo de saída HTML
    // res.send(('Página Inicial')); // entende automaticamente o tipo de saída PLAIN
});

//produtos
app.get('/produtos', (req, res) => {
    res.send(produtos);
})

//produto por /id
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id)
    
    if (produto) {
        res.status(200).send(produto)
    } else {
        res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
    }
})

app.use((req, res) => {
    res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})