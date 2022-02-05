const { expect } = require('chai');
const sinon = require('sinon');

const paginationController = require('../../controllers/pagination');
const paginationService = require('../../services/pagination');

describe('O controller da rota GET/v1/paginacao', () => {
  const response = {};
  const request = {
    query: undefined,
  };
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('retorna erro quando', () => {
    describe('acontece algum erro interno no servidor', () => {
      before(() => {
        sinon.stub(paginationService, 'get').rejects();
      });

      after(async () => {
        await paginationService.get.restore()
      });

      it('a função next é chamada', async () => {
        await paginationController.get(request, response, next);
        expect(next.calledOn()).to.be.true;
      });
    });

    describe('um ou os dois parâmetros query estão faltando', () => {
      const missingParamsError = {
        statusCode: 400,
        code: 'bad_request',
        message: 'Missins query params "paginaAtual" and/or "quantidadePaginas"',
      };

      before(() => {
        request.query = {
          paginaAtual: 1,
        };
      });

      after(() => {
        request.query = undefined;
      });

      it('a função next é retornada com o parâmetro de erro esperado', async () => {
        await paginationController.get(request, response, next);
        expect(next.calledWith(missingParamsError)).to.be.true;
      });
    });

    describe('um ou os dois parâmetros query são inválidos', () => {
      const invalidParamsError = {
        statusCode: 400,
        code: 'bad_request',
        message: 'Invalid query params "paginaAtual" and/or "quantidadePaginas"',
      };

      const responseMock = { code: 'invalidParams' };

      before(() => {
        request.query = {
          paginaAtual: 1,
          quantidadePaginas: 'ten',
        };
        sinon.stub(paginationService, 'get').resolves(responseMock);
      });

      after(async () => {
        await paginationService.get.restore()
        request.query = undefined;
      });

      it('a função next é retornada com o parâmetro de erro esperado', async () => {
        await paginationController.get(request, response, next);
        expect(next.calledWith(invalidParamsError)).to.be.true;
      });
    });

    describe('o parâmetro "paginaAtual" é maior que "quantidadePaginas"', () => {
      const pageBiggerError = {
        statusCode: 400,
        code: 'bad_request',
        message: '"paginaAtual" must be a smaller number than "quantidadePaginas"',
      };

      const responseMock = { code: 'pageBigger' };

      before(() => {
        request.query = {
          paginaAtual: 15,
          quantidadePaginas: 10,
        };
        sinon.stub(paginationService, 'get').resolves(responseMock);
      });

      after(async () => {
        await paginationService.get.restore()
        request.query = undefined;
      });

      it('a função next é retornada com o parâmetro de erro esperado', async () => {
        await paginationController.get(request, response, next);
        expect(next.calledWith(pageBiggerError)).to.be.true;
      });
    });
  });

  describe('retorna uma resposta de sucesso quando', () => {
    describe('as informações dos parâmetros query estão presente e são válidas', () => {
      const paginationMock = ['**1**', '2', '3', '4', '5', '...'];

      before(() => {
        request.query = {
          paginaAtual: 1,
          quantidadePaginas: 10,
        };
        sinon.stub(paginationService, 'get').resolves(paginationMock);
      });

      after(async () => {
        await paginationService.get.restore(); 
        request.query = undefined;
      });

      it('res.status é chamada com o código 200', async () => {
        await paginationController.get(request, response, next);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com a paginação', async () => {
        await paginationController.get(request, response, next);
        expect(response.json.calledWith(paginationMock)).to.be.true;
      });
    });
  });
}); 
