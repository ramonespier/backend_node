const express = require('express');
const router = express.Router();

const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next(); //autenticado
    } else {
        res.status(401).send('Acesso não autorizado.')
    }
}
router.get('/', autenticar, (req, res) => {
    res.status(200).send('<h1>Painel de Administrador</h1>')
});

module.exports = router;