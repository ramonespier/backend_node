    import { readAll, read } from '../config/database.js'

    const listarLivros = async () => {
        try {
            return await readAll('livros')
        } catch (err) {
            console.err('Erro ao obter livros', err)
            throw err;
        }
    }

    const obterLivroPorId = async (id) => {
        try {
            return await read('livros', `id = ${id}`)
        } catch (err) {
            console.error('Erro ao obter livro por ID', err)
            throw err;
        }
    }

    export { listarLivros, obterLivroPorId };