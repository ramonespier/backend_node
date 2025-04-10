import express from "express";
const app = express();
const port = 3000
const API_URL = 'http://localhost:3000'
import rotaClientes from "./routers/cliente.js";
import rotaProdutos from "./routers/produto.js";
import rotaPedidos from "./routers/pedidos.js"
import db from './db.js'

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.use('/clientes', rotaClientes);
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);


app.listen(port, () => {
    console.log(`Servidor rodando em ${API_URL}`)
})