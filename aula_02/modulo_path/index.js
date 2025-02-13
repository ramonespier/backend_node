const path = require("path");

const fullPath = path.join(__dirname, "arquivo.txt");
console.log(fullPath);

const nomeArquivo = path.basename(fullPath);
console.log(nomeArquivo);

const extensao = path.extname(fullPath);
console.log(extensao);