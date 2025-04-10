import express from "express";
const router = express.Router();
import db from "../db.js";

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao obter produtos')
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).send('Produto nao encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao encontrar ID')
    }
})

router.post('/', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    try {
        const [result] = await db.query('INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)', [nome, descricao, preco])
        res.status(201).json({ id: result.insertId, nome, descricao, preco });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir dados na tabela produtos')
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    try {
        const [result] = await db.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [nome, descricao, preco, id])
        if (result.affectedRows > 0) {
            res.json({ id, nome, descricao, preco })
        } else {
            res.status(404).send('Produto não encontrado.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar dados na tabela produtos')
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id])
        if (result.affectedRows > 0) {
            res.status(201).send('Produto excluído com sucesso!')
        } else {
            res.status(404).send('ID não encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir dados na tabela produtos')
    }
})

export default router;