const os = require('os')
const fs = require('fs')

const plataforma = (os.platform())
const arquitetura =(os.arch())
const informacao = JSON.stringify(os.cpus(), null, 2)
const diretorio = (os.homedir())
const sos = (os.type())
const versao = (os.version())
const interface = JSON.stringify(os.networkInterfaces(), null, 2)

const conteudo = 'Plataforma: ' + plataforma + '\n' + 'Arquitetura: ' + arquitetura + '\n' + 'Informação: ' + '\n' + 'Diretório: ' + diretorio + '\n' + 'Sistema Operacional: ' + sos + '\n' + 'Versão: ' + versao + '\n' + 'Interface: ' + interface + "\n" + "CPU: " + informacao;


fs.writeFile('info_sistema.txt', conteudo, (err) => {
    if (err) throw err;
    console.log('Informação coletada com sucesso.');
})