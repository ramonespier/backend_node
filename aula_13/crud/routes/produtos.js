import express from 'express'
import db from '../db.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const produtos = await db.readAll('produtos')
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao listar produtos', err)
        res.status(500).json({ err: 'Erro ao listar produtos' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await db.read('produtos', `id = ${parseInt(id)}`)
        if (produto) {
            res.status(200).json(produto)
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }
    } catch (err) {
        console.error('Erro ao mostrar produto', err)
        res.status(500).json({ err: 'Erro ao listar produto' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduto = await db.create('produtos', req.body)
        res.status(200).json({message: 'produto adicionado com sucesso', id: newProduto})
    } catch (err) {
        console.error('Erro ao criar produto', err)
        res.status(500).json({ err: 'Erro ao criar produto' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const updateProduto = await db.update('produtos', req.body, `id = ${parseInt(id)}`)
        if (updateProduto > 0) {
            res.status(200).json({message: 'Produto alterado com sucesso', id: updateProduto})
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }
    } catch (err) {
        console.error('Erro ao atualizar produto', err)
        res.status(500).json({ err: 'Erro ao atualizar produto' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteProduto = await db.delete('produtos', `id = ${parseInt(id)}`

        )
        if (deleteProduto > 0) {
            res.status(200).json({message: 'Produto deletado com sucesso', id: deleteProduto})
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }

    } catch (err) {
        console.error('Erro ao excluir produto', err)
        res.status(500).json({ err: 'Erro ao excluir produto' })
    }
})

export default router;


