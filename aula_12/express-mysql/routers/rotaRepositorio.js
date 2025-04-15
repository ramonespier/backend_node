import express from 'express'
const router = express.Router()
import db from '../db.js';

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM jogos');
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao obter jogos')
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const [rows] = await db.query('SELECT * FROM jogos WHERE id = ?', [id])
        if (rows.lenght > 0) {
            res.json(rows)
        } else {
            res.status(404).send('Jogo não encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao encontrar ID.')
    }
})

router.options('/', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send()
})

router.options('/:id', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send()
})

export default router;