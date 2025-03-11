const express = require('express');
const app = express();
const port = 3000;

const autenticar = (req, res, next) => {
    // Simulação de autenticação: NUNCA usar em produção!!!
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next(); // Autenticado

    } else {
        res.status(401).send('<b>Não autorizado!</b>')
    }
};

app.get('/admin', autenticar, (req, res) => {
    res.status(200).send('<h1>Painel de Administração</h1>')
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>');
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})