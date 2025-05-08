import { listarLivros, obterLivroPorId } from '../models/Livro.js'

const listarLivrosController = async (req, res) => {
    try {
        const livros = await listarLivros();
        res.status(200).send(livros)
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor', err })
        console.error(err)
    }
}

const obterLivroPorIdController = async (req, res) => {
    try {
        const livro = await obterLivroPorId(req.params.id);

        if (livro) {
            res.status(200).json(livro)
        } else {
            res.status(404).json({ message: 'Livro não encontrado' })
        }

    } catch (err) {
        console.error('Erro ao obter livro por ID', err)
        res.status(500).json({ message: 'Erro ao obter livro por ID', err })
    }
}

export { listarLivrosController, obterLivroPorIdController }