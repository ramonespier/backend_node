const fs = require('fs').promises;

fs.readFile('arquivo.txt', 'utf8')
    .then(data => {
        console.log('Conteúdo do arquivo:', data);
        return data.toUpperCase();
    })

    .then(dataMaiusculas => {
        console.log('Conteúdo em Maiúscula:', dataMaiusculas);
        return dataMaiusculas.toLowerCase();
    })

    .then(dataMinusculas => {
        console.log('Conteúdo em Maiúscula:', dataMinusculas);
    })
    
    .catch(err => {
        console.error('Erro ao ler o arquivo:', err);
    });

console.log('Esta linha será executada antes da leitura do arquivo!')