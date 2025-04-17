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
    res.header('Allow', 'GET, POST, DELETE, PUT');
    res.status(204).send()
})

router.post('/', autenticar, async (req, res) => {
    const { nome, is_installed, genero } = req.body
    const [result] = await db.query('INSERT INTO jogos (nome, is_installed, genero) VALUES (?, ?, ?)', [nome, is_installed, genero])
    try {
        res.status(201).json({ id: result.insertId, nome, is_installed, genero });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir na dados na tabela jogos.')
    }
});

router.patch('/:id', autenticar, async (req, res) => {
    const { id } = req.params;
    const { nome, is_installed, genero } = req.body;

    try {
        const [result] = await db.query('UPDATE jogos SET nome = ?, is_installed = ?, genero = ? WHERE id = ?', [nome, is_installed, genero, id])
        if (result.affectedRows > 0) {
            res.status(201).json({ nome, is_installed, genero })
        } else {
            res.status(404).send('Jogo não encontrado')
        }

    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao atualizar dados na tabela jogos')
    }
})


router.delete('/:id', autenticar, async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await db.query('DELETE FROM jogos WHERE id = ?', [id])
        if(result.affectedRows > 0) {
            res.status(201).send('Pedido excluído com sucesso!')
        } else {
            res.status(404).send('ID não encontrado.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir dados na tabela jogos')
    }
});

export default router;