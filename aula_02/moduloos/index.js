const os = require('os');

console.log(`Plataforma: ${os.platform()}`);
console.log(`Arquitetura: ${os.arch()}`);
console.log('Informação da CPU: ', os.cpus());
console.log('Diretório do usuário: ', os.homedir());
console.log('Sistema Operacional: ', os.type());
console.log('Versão do sistema: ', os.version());
console.log('Interaces de Rede: ', os.networkInterfaces());
