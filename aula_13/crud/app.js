import express from 'express'
const app = express();
const port = 3000;
const API_URL = 'http://localhost:3000';

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.get('/clientes', async (req, res) => {
    
})

app.listen(port, () => {
    console.log('Servidor rodando em ', API_URL)
})