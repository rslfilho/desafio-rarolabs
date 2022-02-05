const { expect } = require('chai');
const sinon = require('sinon');

const { getPagination } = require('../../helpers');

describe('A função helpers.getPagination()', () => {
  let response;

  describe('quando a "quantidadePaginas" for menor ou igual a "5"', () => {
    describe('o retorno da função', () => {
      const expectedResult = ['**1**', '2', '3', '4'];
      before(() => {
        response = getPagination(1, 4);
      });

      it('deve ser um array', () => {
        expect(response).to.be.an('array');
      });

      it('o array deve ser igual o esperado', () => {
        expect(response).to.deep.equal(expectedResult);
      });
    });
  });

  describe('quando "pageQuantity" é maior que "05"', () => {
    describe('quando a primeiro valor exibido for "1"', () => {
      describe('o retorno da função', () => {
        const expectedResult = ['1', '2', '**3**', '4', '5', '...'];
        before(() => {
          response = getPagination(3, 20);
        });
  
        it('deve ser um array', () => {
          expect(response).to.be.an('array');
        });
  
        it('o array deve ser igual o esperado', () => {
          expect(response).to.deep.equal(expectedResult);
        });
      });
    });

    describe('quando a "paginaAtual" está muito próxima do limite da paginação', () => {
      describe('o retorno da função', () => {
        const expectedResult = ['...', '6', '7', '8', '**9**', '10'];
        before(() => {
          response = getPagination(9, 10);
        });
  
        it('deve ser um array', () => {
          expect(response).to.be.an('array');
        });
  
        it('o array deve ser igual o esperado', () => {
          expect(response).to.deep.equal(expectedResult);
        });
      });
    });

    describe('quando a "paginaAtual" não está muito próxima do "1" ou do limite da paginação', () => {
      describe('o retorno da função', () => {
        const expectedResult = ['...', '4', '5', '**6**', '7', '8', '...'];
        before(() => {
          response = getPagination(6, 15);
        });
  
        it('deve ser um array', () => {
          expect(response).to.be.an('array');
        });
  
        it('o array deve ser igual o esperado', () => {
          expect(response).to.deep.equal(expectedResult);
        });
      });
    });
  });
});
