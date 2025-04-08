import db from './conexao.js'

db.query('select * from clientes', (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar a consulta: ', err);
        return;
    }
    console.log('Resultados da consulta', results);
    console.log('Campos da consulta', fields);
})

db.end((err) =>{
    if (err) {
        console.error('Erro ao encerrar a conexão: ', err)
        return;
    }
    setTimeout(() => {
        console.log('Conexão finalizada.')
    }, 1);
})