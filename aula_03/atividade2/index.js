const fs = require('fs')

fs.readFile('dados.json', 'utf8', (err, data) => {
    if(err) throw err;
    const dados = JSON.parse(data)
    console.log(dados)
})


try {
    
    dados.produto.forEach(produto => {
        console.log(`\nNome: ${produto.nome}\nPreço: ${produto.preco}\nDescrição: ${produto.descrição}\n`)
    });

} catch (erro) {
    console.log("erro", erro)
}