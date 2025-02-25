const http = require('http');

const produtos = [
    {id: 1, nome: "Bis", preço: 11.00},
    {id: 2, nome: "Twix", preço: 3.50},
    {id: 3, nome: "Trento", preço: 4.00},
    {id: 4, nome: "Hersheys", preço: 8.50},
    {id: 5, nome: "Ouro Branco", preço: 1.50}
]

const server = http.createServer((req, res) => {
    const {method, url} = req;
    console.log(`Requisição recebida: ${method} ${url}`)
    
    if (url === "/" && method === "GET") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end('<h1>Página Inicial</h1>');
        
    } else if (url === '/produtos' && method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(produtos));
        
    } else if (url.startsWith('/produtos/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const produto = produtos.find(p => p.id === id);
        
        if (produto) {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(produto));
        } else {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.end('<p>Erro 404 <br>Produto não encontrado.</p>');

        }
    }

});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})