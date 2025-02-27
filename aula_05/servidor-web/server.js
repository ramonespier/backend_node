const http = require('http');

const produtos = [
    { id: 1, nome: "Bis", preço: 11.00 },
    { id: 2, nome: "Twix", preço: 3.50 },
    { id: 3, nome: "Trento", preço: 4.00 },
    { id: 4, nome: "Hersheys", preço: 8.50 },
    { id: 5, nome: "Ouro Branco", preço: 1.50 }
]

const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(`Requisição recebida: ${method} ${url}`)

    if (url === "/" && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Página Inicial</h1>');

    } else if (url === '/produtos' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(produtos));

    } else if (url.startsWith('/produtos/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const produto = produtos.find(p => p.id === id);

        if (produto) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(produto));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<p>Erro 404 <br>Produto não encontrado.</p>');
        }
        
        
        // ENVIAR POST (via curl)
        
    } else if (url === '/contato' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        
        req.on('end', () => {
            console.log('Dados recebidos: ', body)
            res.writeHead(201, {'Content-Type':'text/plain'});
            res.end('\n\nDados de contato recebidos com sucesso!!!');
        })
        
        // curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "nome=Ramon&email=email@email.com" http://localhost:3000/contato
    } else {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('*Erro 404* \n Página NÃO encontrado.');
        
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})