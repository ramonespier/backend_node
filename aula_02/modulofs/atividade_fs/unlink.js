const fs = require('fs');

fs.unlink('unlink.txt', err => {
    if (err) throw err;
    console.log('Arquivo excluído com sucesso!')
});