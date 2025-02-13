const os = require('os')
const fs = require('fs')

const plataforma = (os.platform())
const arquitetura =(os.arch())
const informacao = (os.cpus())
const diretorio = (os.homedir())
const sos = (os.type())
const versao = (os.version())
const interface = os.networkInterfaces()

const conteudo = 'Plataforma: ' + plataforma + '\n' + 'Arquitetura: ' + arquitetura + '\n' + 'Informação: ' + informacao + '\n' + 'Diretório: ' + diretorio + '\n' + 'Sistema Operacional: ' + sos + '\n' + 'Versão: ' + versao + '\n' + 'Interface: ' + interface


fs.writeFile('info_sistema.txt', conteudo, (err) => {
    if (err) throw err;
    console.log('Informação coletada com sucesso.');
})