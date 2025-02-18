const  dados = {
    produtos: [
        {nome: 'Hersheys', preço: 10.99},
        {nome: 'M&M\'s', preço: 8.99},
        {nome: 'Reese\'s', preço: 12.99},
    ]
}

dados.produtos.forEach(produto => {
    console.log(`O produto ${produto.nome} custa R$ ${produto.preço.toFixed(2)}`);
})