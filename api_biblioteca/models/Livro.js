    import { readAll, read, create, update, deleteRecord } from '../config/database.js'

    const listarLivros = async () => {
        try {
            return await readAll('livros')
        } catch (err) {
            console.error('Erro ao obter livros', err)
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

    const criarLivro = async (livroData) => {
        try {
            return await create('livros', livroData);
        } catch (err) {
            console.error('Erro ao criar livro ', err);
            throw err;
        }
    }

    const atualizarLivro = async (id, livroData) => {
        try {
            return await update('livros', livroData, `id = ${id}`);
        } catch (err) {
            console.error('Erro ao atualizar livro', err);
            throw err;
        }
    }

    const excluirLivro = async (id) => {
        try {
            return await deleteRecord('livros', `id = ${id}`)
        } catch (err) {
            console.error('Erro ao excluir livro', err);
            throw err;
        }
    }

    export { listarLivros, obterLivroPorId, criarLivro, atualizarLivro, excluirLivro };