const fs = require('fs');

fs.rmdir('fs_diretorio', err => {
    if (err) throw err;
    console.log('Diretório deletado com sucesso.');
})