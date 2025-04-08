import db from './conexao.js'

const novocliente = {
    nome: 'Davi Chagas',
    email: 'davi@email.com',
    endereco: 'Rua Juquiá'
};
/* PROTEÇÃO DE SQL INJECTION       ↓   */
db.query('INSERT INTO clientes SET ?',  novocliente, (err, results) => {
    if (err) {
        console.error('Erro ao inserir informações no banco de dados')
        db.end()
        return;
    }
    
    console.log('Dado inserido com sucesso! ID do novo cliente: ', results.insertId)
    
    db.end() 

}) 
