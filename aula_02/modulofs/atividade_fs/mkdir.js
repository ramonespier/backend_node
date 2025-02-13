const fs = require('fs');

fs.mkdir ('fs_diretorio', err => {
    if (err) throw err;
    console.log('Diretório criado com sucesso!')
});