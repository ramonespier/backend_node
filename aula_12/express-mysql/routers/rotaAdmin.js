import express from 'express'
const router = express.Router()
import db from '../db.js'

router.use(express.json())


const autenticar = (req, res, next) => {
    const token = req.headers['authorization']
    if (token === 'SEGREDO') {
        // router.send('Usuario autenticado como admin')
        next()
    } else {
        res.status(401).send('<h1 style="color: red;">ERRO 401</h1><br><p style="font-weight:bold;">Sem autorização</p>')
    }
}

const logger = (req, res, next) => {
    const data = new Date();
    console.log(`[${data.toISOString()}] ${req.method} ${req.url}`);
    next()
}

router.use(logger)

router.get('/', autenticar, (req, res) => {
    res.status(200).send('Painel de controle liberado.')
    console.log("MODO DE ADMINISTRADOR ACESSADO")
})

router.options('/', autenticar, (req, res) => {
    res.header('Allow', 'GET, POST, DELETE, PATCH');
    res.status(204).send()
})

router.post('/', autenticar, async (req, res) => {
    const { nome, is_installed, genero } = req.body
    const [result] = await db.query('INSERT INTO jogos (nome, is_installed, genero) VALUES (?, ?, ?)', [nome, is_installed, genero])
    try {
        res.status(201).json({ id: result.insertId, nome, is_installed, genero });
    } catch (err) {
        console.error(err);
        res.status(500).send(result)
    }
});


// router.delete('/:id', autenticar, (req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         const caminho = '../repoJogos.json';
//         const data = JSON.parse(fs.readFileSync(caminho, 'utf8'));
//         const deletar = data.filter(game => game.id !== id);

//         fs.writeFileSync(caminho, JSON.stringify(deletar, null, 2));
//         res.send('Jogo removido com sucesso!');

//     } catch (error) {
//         console.error('Erro ao deletar:', error);
//         res.status(500).send('Erro ao remover jogo');
//     }
// });

export default router;