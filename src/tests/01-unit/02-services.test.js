const chai = require('chai');
chai.use(require('chai-uuid'));
const sinon = require('sinon');

const { expect } = chai;

const paginationService = require('../../services/pagination');
const validateService = require('../../services/validate');
const helpers = require('../../helpers');

describe('O service da rota GET/v1/paginacao', () => {
  let response;

  describe('retorna objeto de erro', () => {
    describe('os parâmetros são inválidos', () => {
      before(async () => {
        sinon.stub(validateService, 'queryParams').returns({ error: true });
        response = await paginationService.get(4, 'ten');
      });

      after(async () => {
        await validateService.queryParams.restore();
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem a chave "code"', () => {
        expect(response).to.have.all.keys('code');
      });

      it('a chave "code" do objeto retornado tem o valor "invalidParams"', () => {
        expect(response.code).to.eq('invalidParams');
      });
    });

    describe('o parâmetro "page" é maior que "pageQuantity"', () => {
      before(async () => {
        sinon.stub(validateService, 'queryParams').returns({ error: undefined });
        response = await paginationService.get(15, 10);
      });

      after(async () => {
        await validateService.queryParams.restore();
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem a chave "code"', () => {
        expect(response).to.have.all.keys('code');
      });

      it('a chave "code" do objeto retornado tem o valor "pageBigger"', () => {
        expect(response.code).to.eq('pageBigger');
      });
    });
  });

  describe('retorna a paginação corretamente', () => {
    describe('todos os parâmetros são válidos e corretos', () => {
      const paginationMock = ['...', '2', '3', '**4**', '5', '6', '...'];
      const uuidMock = 'a416d989-91d1-48c9-b583-267df138834c';

      before(async () => {
        sinon.stub(helpers, 'getPagination').returns(paginationMock);
        sinon.stub(validateService, 'queryParams').returns({ error: undefined });
        response = await paginationService.get(4, 10);
      });

      after(async () => {
        await helpers.getPagination.restore();
        await validateService.queryParams.restore();
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem a chave "code"', () => {
        expect(response).to.have.all.keys('id', 'paginacao');
      });

      it('a chave "id" do objeto seja um uuid válido', () => {
        expect(response.id).to.be.a.uuid;
      });

      it('a chave "paginacao" do objeto tem o valor esperado', () => {
        expect(response.paginacao).to.deep.equal(paginationMock);
      });
    });
  });
});

describe('O service de validação', () => {
  let response;
  
  describe('quando os dados estão inválidos', () => {
    before(() => {
      response = validateService.queryParams({ page: 8, pageQuantity: 'twelve' });
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto tem a chave "error" e "value"', () => {
      expect(response).to.have.all.keys('value', 'error');
    });

    it('a chave "error" do objeto seja um objeto', () => {
      expect(response.error).to.be.an('error');
    });
  });

  describe('os dados estão válidos', () => {
    before(() => {
      response = validateService.queryParams({ page: 8, pageQuantity: 11 });
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto não tem a chave "error"', () => {
      expect(response).to.not.have.key('error');
    });
  })
});
