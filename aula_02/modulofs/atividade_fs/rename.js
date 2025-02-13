const fs = require('fs');

fs.rename('rename.txt', 'renomeadoSucesso.txt', err => {
    if (err) throw err;
    console.log('Nome alterado com sucesso!')
})