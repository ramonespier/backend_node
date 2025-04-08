import db from './conexao.js'

db.query('DELETE FROM clientes where id = ?', 7, (err, results) => {
    if(err) {
        console.error('Erro ao excluir dados: ', err)
        db.end()
        return;
    }

    console.log('Dados deletados! Linhas afetadas: ', results.affectedRows)
    db.end()
})