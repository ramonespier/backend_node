import express from "express";
import cors from 'cors'
const app = express();
const port = 3000;

import livroRoute from './routes/livroRoutes.js'
import authRoute from "./routes/authRoutes.js";

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API de livros')
})

app.use('/livros', livroRoute)
app.use('/auth', authRoute)

app.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS')
    res.status(204).send()
})

app.use((req, res) => {
    res.status(404).json({message: 'Este caminho não existe.'})
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})