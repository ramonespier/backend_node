import express from "express";
const app = express();
const port = 3000
const API_URL = 'http://localhost:3000'
import rotaRepositorio from "./routers/rotaRepositorio.js";
import rotaAdmin from "./routers/rotaAdmin.js";

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>')
})

app.use('/repositorio', rotaRepositorio);
app.use('/repositorio/:id', rotaRepositorio);
app.use('/admin', rotaAdmin)
app.use((req, res) => {
    res.status(404).send('<h1 style="color: red;">ERRO 404</h1><br><p style="font-weight:bold;">Página não encontrada</p>')
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${API_URL}`)
})