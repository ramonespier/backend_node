const fs = require('fs');

const newLine = '\nNova linha de texto';
fs.appendFile('arquivo.txt', newLine, err => {
    if (err) throw err;
    console.log('Informação adicionada!!');
})