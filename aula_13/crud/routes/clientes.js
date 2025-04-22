import express from 'express'
import db from '../db.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const clientes = await db.readAll('clientes')
        res.status(200).json(clientes)
    } catch (err) {
        console.error('Erro ao listar clientes', err)
        res.status(500).json({ err: 'Erro ao listar clientes' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await db.read('clientes', `id = ${parseInt(id)}`)
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
        const newCliente = await db.create('clientes', req.body)
        res.status(200).json({message: 'Cliente adicionado com sucesso', id: newCliente})
    } catch (err) {
        console.error('Erro ao criar cliente', err)
        res.status(500).json({ err: 'Erro ao criar cliente' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const updateCliente = await db.update('clientes', req.body, `id = ${parseInt(id)}`)
        if (updateCliente > 0) {
            res.status(200).json({message: 'Cliente alterado com sucesso', id: updateCliente})
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' })
        }
    } catch (err) {
        console.error('Erro ao atualizar cliente', err)
        res.status(500).json({ err: 'Erro ao atualizar cliente' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteCliente = await db.delete('clientes', `id = ${parseInt(id)}`

        )
        if (deleteCliente > 0) {
            res.status(200).json({message: 'Cliente deletado com sucesso', id: deleteCliente})
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' })
        }

    } catch (err) {
        console.error('Erro ao excluir cliente', err)
        res.status(500).json({ err: 'Erro ao excluir cliente' })
    }
})

export default router;


