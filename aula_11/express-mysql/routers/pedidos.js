import express from "express";
const router = express.Router();
import db from "../db.js";

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pedidos');
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao obter pedidos')
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await db.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).send('Pedido nao encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao encontrar ID')
    }
})

router.post('/', async (req, res) => {
    const { cliente_id, dia, total } = req.body;
    try {
        const [result] = await db.query('INSERT INTO pedidos (cliente_id, dia, total) VALUES (?, ?, ?)', [cliente_id, dia, total])
        res.status(201).json({ id: result.insertId, cliente_id, dia, total });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir dados na tabela pedidos')
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente_id, dia, total } = req.body;

    try {
        const [result] = await db.query('UPDATE pedidos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [cliente_id, dia, total, id])
        if (result.affectedRows > 0) {
            res.json({ id, cliente_id, dia, total })
        } else {
            res.status(404).send('Pedido não encontrado.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar dados na tabela pedidos')
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM pedidos WHERE id = ?', [id])
        if (result.affectedRows > 0) {
            res.status(201).send('Pedido excluído com sucesso!')
        } else {
            res.status(404).send('ID não encontrado.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir dados na tabela pedidos')
    }
})

export default router;