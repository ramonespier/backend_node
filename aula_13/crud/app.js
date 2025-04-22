import express from 'express'
const app = express();
const port = 3000;
const API_URL = 'http://localhost:3000';
import clientesRoutes from './routes/clientes.js';
import produtosRoutes from './routes/produtos.js';
import pedidosRoutes from './routes/pedidos.js';
import itensPedidosRoutes from './routes/itensPedidos.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)
app.use('/pedidos', pedidosRoutes)
app.use('/itensPedidos', itensPedidosRoutes)

app.listen(port, () => {
    console.log('Servidor rodando em ', API_URL)
})