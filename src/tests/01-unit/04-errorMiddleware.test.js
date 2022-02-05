const { expect } = require('chai');
const sinon = require('sinon');

const { error } = require('../../middlewares');

describe('O middleware de erro da aplicação', () => {
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

  describe('quando recebe um erro esperado dentro da aplicação', () => {
    const missingParamsError = {
      statusCode: 400,
      code: 'bad_request',
      message: 'Missins query params "paginaAtual" and/or "quantidadePaginas"',
    };

    it('a função res.status é chamada com o "statusCode" do erro', () => {
      error(missingParamsError, request, response, next);
      expect(response.status.calledWith(400)).to.be.true;
    });

    it('a função res.json é chamada com um objeto com a "message" do erro ', () => {
      error(missingParamsError, request, response, next);
      expect(response.json.calledWith({ message: missingParamsError.message })).to.be.true;
    });
  });

  describe('quando recebe um erro genérico interno da aplicação', () => {
    it('a função res.status é chamada com o valor "500"', () => {
      error({}, request, response, next);
      expect(response.status.calledWith(500)).to.be.true;
    });

    it('a função res.json é chamada com um objeto com a "message" "Internal Error" ', () => {
      error({}, request, response, next);
      expect(response.json.calledWith({ message: 'Internal Error' })).to.be.true;
    });
  });
}); 
