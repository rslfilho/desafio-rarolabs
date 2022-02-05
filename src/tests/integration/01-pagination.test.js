const chai = require('chai');
chai.use(require('chai-uuid'));
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const paginationService = require('../../services/pagination');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/v1/paginacao', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      stub(paginationService, 'get').rejects();
      response = await chai.request(app)
        .get('/v1/paginacao')
        .query({
          paginaAtual: 4,
          quantidadePaginas: 10,
        });

      await paginationService.get.restore();
    });

    it('retorna o código de status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Internal Error"', () => {
      expect(response.body.message).to.be.equal('Internal Error');
    });
  });

  describe('Não é possível retornar a paginação', () => {
    describe('sem enviar os parâmetros query', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/v1/paginacao');
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto Missins query params "paginaAtual" and/or "quantidadePaginas"', () => {
        expect(response.body.message).to.be.equal('Missins query params "paginaAtual" and/or "quantidadePaginas"');
      });
    });

    describe('com parâmetros query inválidos', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/v1/paginacao')
          .query({
            paginaAtual: 'four',
            quantidadePaginas: 'ten',
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid query params "paginaAtual" and/or "quantidadePaginas""', () => {
        expect(response.body.message).to.be.equal('Invalid query params "paginaAtual" and/or "quantidadePaginas"');
      });
    });

    describe('com o valor de "paginaAtual" maior que o valor de "quantidadePaginas"', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/v1/paginacao')
          .query({
            paginaAtual: 15,
            quantidadePaginas: 10,
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto ""paginaAtual" must be a smaller number than "quantidadePaginas""', () => {
        expect(response.body.message).to.be.equal('"paginaAtual" must be a smaller number than "quantidadePaginas"');
      });
    });
  });

  describe('É possível retornar a paginação corretamente', () => {
    describe('quando a "quantidadePaginas" for menor ou igual a "5"', () => {
      let response;
        before(async () => {
          response = await chai.request(app)
            .get('/v1/paginacao')
            .query({
              paginaAtual: 4,
              quantidadePaginas: 5,
            });
        });
        
        it('retorna o código de status 200', () => {
          expect(response).to.have.status(200);
        });
  
        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('o objeto possui as propriedades "id" e "paginacao"', () => {
          expect(response.body).to.have.all.keys('id', 'paginacao');
        });
  
        it('a chave "id" deve ser um valor UUID válido', () => {
          expect(response.body.id).to.be.a.uuid('v4');
        })
  
        it('a chave "paginação" ter o valor esperado', () => {
          expect(response.body.paginacao).to.deep.equal(['1', '2', '3', '**4**', '5']);
        });
    });

    describe('quando a "quantidadePaginas" for maior que "5"', () => {
      describe('quando a primeiro valor exibido for "1"', () => {
        let response;
          before(async () => {
            response = await chai.request(app)
              .get('/v1/paginacao')
              .query({
                paginaAtual: 2,
                quantidadePaginas: 10,
              });
          });
          
          it('retorna o código de status 200', () => {
            expect(response).to.have.status(200);
          });
    
          it('retorna um objeto', () => {
            expect(response.body).to.be.an('object');
          });
    
          it('o objeto possui as propriedades "id" e "paginacao"', () => {
            expect(response.body).to.have.all.keys('id', 'paginacao');
          });
    
          it('a chave "id" deve ser um valor UUID válido', () => {
            expect(response.body.id).to.be.a.uuid('v4');
          })
    
          it('a chave "paginação" ter o valor esperado', () => {
            expect(response.body.paginacao).to.deep.equal(['1', '**2**', '3', '4', '5', '...']);
          });
      });

      describe('quando a "paginaAtual" está muito próxima do limite da paginação', () => {
        let response;
          before(async () => {
            response = await chai.request(app)
              .get('/v1/paginacao')
              .query({
                paginaAtual: 9,
                quantidadePaginas: 10,
              });
          });
          
          it('retorna o código de status 200', () => {
            expect(response).to.have.status(200);
          });
    
          it('retorna um objeto', () => {
            expect(response.body).to.be.an('object');
          });
    
          it('o objeto possui as propriedades "id" e "paginacao"', () => {
            expect(response.body).to.have.all.keys('id', 'paginacao');
          });
    
          it('a chave "id" deve ser um valor UUID válido', () => {
            expect(response.body.id).to.be.a.uuid('v4');
          })
    
          it('a chave "paginação" ter o valor esperado', () => {
            expect(response.body.paginacao).to.deep.equal(['...', '6', '7', '8', '**9**', '10']);
          });
      });
  
      describe('quando a "paginaAtual" não está muito próxima do "1" ou do limite da paginação', () => {
        let response;
          before(async () => {
            response = await chai.request(app)
              .get('/v1/paginacao')
              .query({
                paginaAtual: 5,
                quantidadePaginas: 10,
              });
          });
          
          it('retorna o código de status 200', () => {
            expect(response).to.have.status(200);
          });
    
          it('retorna um objeto', () => {
            expect(response.body).to.be.an('object');
          });
    
          it('o objeto possui as propriedades "id" e "paginacao"', () => {
            expect(response.body).to.have.all.keys('id', 'paginacao');
          });
    
          it('a chave "id" deve ser um valor UUID válido', () => {
            expect(response.body.id).to.be.a.uuid('v4');
          })
    
          it('a chave "paginação" ter o valor esperado', () => {
            expect(response.body.paginacao).to.deep.equal(['...', '3', '4', '**5**', '6', '7', '...']);
          });
      });
    });
  });
});
