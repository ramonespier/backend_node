const fs = require('fs')

fs.readFile('dados.json', 'utf8', (err, data) => {
    if(err) {
        console.log("Erro")
        return;
    }
    
    const dados = JSON.parse(data)
    
    try {
        
        dados.produtos.forEach(produto => {
            console.log(`\nNome: ${produto.Nome}\nPreço: ${produto.Preço}\nDescrição: ${produto.Descrição}\n`)
        });
        
    } catch (erro) {
        console.log("erro", erro)
    }
})