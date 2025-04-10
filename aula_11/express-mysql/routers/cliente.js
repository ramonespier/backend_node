import express from "express";
const router = express.Router();
import db from "../db.js";

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes');
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao obter clientes')
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).send('Cliente nao encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao encontrar ID')
    }
})

router.post('/', async (req, res) => {
    const { nome, email, endereco } = req.body;
    try {
        const [result] = await db.query('INSERT INTO clientes (nome, email, endereco) VALUES (?, ?, ?)', [nome, email, endereco])
        res.status(201).json({ id: result.insertId, nome, email, endereco });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir dados na tabela clientes')
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, endereco } = req.body;

    try {
        const [result] = await db.query('UPDATE clientes SET nome = ?, email = ?, endereco = ? WHERE id = ?', [nome, email, endereco, id])
        if (result.affectedRows > 0) {
            res.json({ id, nome, email, endereco })
        } else {
            res.status(404).send('Cliente não encontrado.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar dados na tabela clientes')
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id])
        if (result.affectedRows > 0) {
            res.status(201).send('Cliente excluído com sucesso!')
        } else {
            res.status(404).send('ID não encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir dados na tabela clientes')
    }
})

export default router;