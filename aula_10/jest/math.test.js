const somar = require('./matematica')
// import somar from './matematica';

describe('Função Somar', () => {
    //t1
    it('Deve somar dois números corretamente', () => {
        expect(somar(2,5)).toBe(7)
    });
    //t2
    it('Deve somar números positivos e negativos corretamente', () => {
        expect(somar(-5,7)).toBe(2)
    });
    //t3
    it('Deve somar números negativos corretamente', () => {
        expect(somar(-5,-5)).toBe(-10)
    });
    
});
