import express from 'express'
import db from '../db.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const pedidos = await db.readAll('pedidos')
        res.status(200).json(pedidos)
    } catch (err) {
        console.error('Erro ao listar pedidos', err)
        res.status(500).json({ err: 'Erro ao listar pedidos' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await db.read('pedidos', `id = ${parseInt(id)}`)
        if (cliente) {
            res.status(200).json(cliente)
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' })
        }
    } catch (err) {
        console.error('Erro ao mostrar cliente', err)
        res.status(500).json({ err: 'Erro ao listar cliente' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newPedido = await db.create('pedidos', req.body)
        res.status(200).json({message: 'Pedido adicionado com sucesso', id: newPedido})
    } catch (err) {
        console.error('Erro ao criar pedido', err)
        res.status(500).json({ err: 'Erro ao criar pedido' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const updatePedido = await db.update('pedidos', req.body, `id = ${parseInt(id)}`)
        if (updatePedido > 0) {
            res.status(200).json({message: 'Pedido alterado com sucesso', id: updatePedido})
        } else {
            res.status(404).json({ message: 'Pedido não encontrado' })
        }
    } catch (err) {
        console.error('Erro ao atualizar pedido', err)
        res.status(500).json({ err: 'Erro ao atualizar pedido' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletePedido = await db.delete('pedidos', `id = ${parseInt(id)}`

        )
        if (deletePedido > 0) {
            res.status(200).json({message: 'Pedido deletado com sucesso', id: deletePedido})
        } else {
            res.status(404).json({ message: 'Pedido não encontrado' })
        }

    } catch (err) {
        console.error('Erro ao excluir pedido', err)
        res.status(500).json({ err: 'Erro ao excluir pedido' })
    }
})

export default router;


