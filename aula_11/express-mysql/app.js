import express from "express";
const app = express();
const port = 3000
const API_URL = 'http://locahost:3000'
import db from './db.js'


app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes');
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao obter clientes')
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em ${API_URL}`)
})