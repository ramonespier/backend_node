import db from './conexao.js';

const clienteAtualizado = {
    nome: 'Rachel Viana',
    email: 'rchlvms@email.com'
};
                                    /* ID DO UPDATE (PATCH)       ↓ */
db.query('UPDATE clientes SET? WHERE id = ?', [clienteAtualizado, 4], (err, results) => {
    if (err) {
        console.error('Erro ao atualizar os dados enviados: ', err);
        db.end()
        return;
    }
    console.log('Dados atualizados com sucesso! Linhas afetadas: ', results.affectedRows )

    db.end();
})