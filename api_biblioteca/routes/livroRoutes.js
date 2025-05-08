import express from "express";
import { listarLivrosController, obterLivroPorIdController } from "../controllers/LivroController.js";

const router = express.Router()

router.get('/', listarLivrosController)
router.get('/:id', obterLivroPorIdController)

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS')
    res.status(204).send()
})

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS')
    res.status(204).send()
})

export default router;