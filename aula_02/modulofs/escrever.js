const fs = require('fs');

const conteudo = 'Este é o conteúdo do meu arquivo.';

fs.writeFile('arquivo.txt', conteudo, err => {
    if (err) throw err;
    console.log('Arquivo criado com sucesso.');
});