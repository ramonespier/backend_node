const express = require("express")
const router = express.Router();


const autenticar = (req, res, next) => {
    const token = req.headers['authorization']
    if (token === 'SEGREDO') {
        next()
    } else {
            res.status(401).send('<h1 style="color: red;">ERRO 401</h1><br><p style="font-weight:bold;">Sem autorização</p>')
    }
}

router.get('/', autenticar, (req, res) => {
    res.status(200).send('<h1>Painel de controle</h1>')
})

module.exports = router;