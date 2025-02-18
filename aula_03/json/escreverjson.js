const fs = require('fs');


const dados = {
        nome: 'Ramon',
        idade: 19,
        cidade: 'São Paulo',
};

const jsonData = JSON.stringify(dados, null, 2);

fs.writeFile('dados2.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.log('Erro ao escrever no arquivo: ', err);
        return;
    }
    console.log('Arquivo criado com sucesso.');
});