import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja_bend'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados', err);
        return;
    }

    console.log('Conexão estabelecida com sucesso!');
})

export default connection;