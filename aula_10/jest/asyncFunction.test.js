const buscarDados = require('./asyncFunction')

describe('Função de buscar dados', () => {
    it("Deve retornar os dados corretamente", () => {
        return buscarDados()
        .then(data => {
            expect(data).toBeDefined();
            expect(data.userId).toBe(1)
            expect(data.id).toBe(1)
            expect(data.title).toBe("delectus aut autem")
            expect(data.completed).toBe(false)
        })
    });
    
});
