# API de paginação

## Índice

- [Descrição](#Descrição)
- [Como Usar Online](#Como-Usar-Online)
- [Como Usar Localmente](#Como-usar-no-ambiente-local)
- [Desenvolvimento](#Desenvolvimento)
- [Arquitetura](#Arquitetura)
- [Outros Scripts da Aplicação](#outros-scripts-configurados-na-aplicação)
- [Deploy](#Deploy)
- [Contribuições](#Contribuições)
- [Contato](#Contato)

## Descrição

Repositório com o código de uma **API Rest**, em Node.js com Express.

Esta API foi desenvolvida para o desafio técnico do processo seletivo impulsionado da Raro Labs com a Trybe. 
Nela tem apenas uma rota `GET/v1/paginacao` que recebe dois números pelos parâmetros query `paginaAtual` e `quantidadePaginas` e retorna um Array de strings com a paginação.

O retorno esperado segue algumas [regras](https://git.rarolabs.com.br/-/snippets/308):

- a API deve receber dois parâmetros, a página atual e a quantidade de páginas.
  - se a quantidade de páginas for menor ou igual a 5, deve exibir todos os números no array
  - se a quantidade for maior que 5, deverá:

- exibir os números ao redor da página atual, compondo ao total 5 elementos exibidos
  - se o primeiro valor dos cinco exibidos não for o valor 1, adicionar reticências (...) na primeira opção
  - se o último valor dos cinco exibidos não for a última página, adicionar reticências (...) na última opção

- o módulo deverá retornar um array de strings, com as seguintes regras:
  - a página atual deverá estar marcado em negrito, na sintaxe markdown (envolto por dois asteriscos **)
  - os demais números exibidos deverão ser apresentados como strings
  - os valores não exibidos serão representados um uma string de reticências (...)
  
- O exemplo abaixo demonstra as páginas caminhando uma a uma, a partir da página 1 até a 10

```javascrip
  ['**1**', '2', '3', '4', '5', '...']
  ['1', '**2**', '3', '4', '5', '...']
  ['1', '2', '**3**', '4', '5', '...']
  ['...', '2', '3', '**4**', '5', '6', '...']
  ['...', '3', '4', '**5**', '6', '7', '...']
  ['...', '4', '5', '**6**', '7', '8', '...']
  ['...', '5', '6', '**7**', '8', '9', '...']
  ['...', '6', '7', '**8**', '9', '10']
  ['...', '6', '7', '8', '**9**', '10']
  ['...', '6', '7', '8', '9', '**10**']
```

## Como usar online

Para acessar a página Swagger da aplicação rodando e/ou testar a aplicação, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação, basta clicar [aqui](https://rslfilho-rarolabs.herokuapp.com/swagger/).

Para fazer requisições à aplicação rodando, faça uma requisição `GET` com os parâmetros query `paginaAtual` e `quantidadePaginas` ao endpoint `https://rslfilho-rarolabs.herokuapp.com/v1/paginacao`, exemplo:

```bash
curl -X 'GET' \
  'https://rslfilho-rarolabs.herokuapp.com/v1/paginacao?paginaAtual=4&quantidadePaginas=10' \
  -H 'accept: application/json'
```

## Como usar no ambiente local

1 - Para clonar o repositório, vá até o diretório onde deseja clonar, execute o `git clone` e depois entre no diretório criado:

```bash
git clone git@github.com:rslfilho/desafio-rarolabs.git
cd desafio-rarolabs
```

2- Já dentro do diretório, instale as depedências (pode usar `npm` ou `yarn`):

```bash
yarn install
```
ou
```bash
npm install
```

3 - Depois de instaladas as depedências, inicie a aplicação:

```bash
yarn start
```
ou
```bash
npm start
```

4 - A aplicação estárá rodando e acessível em `http://localhost:3000/`. A porta pode modificar se tiver uma variável `PORT` no ambiente que estiver executando;

5 - Para conseguir uma paginação, faça uma requisição `GET` na rota `http://localhost:3000/v1/paginacao` passando os parâmetros query `paginaAtual` e `quantidadePaginas`, exemplo:

```bash
curl -X 'GET' \
  'http://localhost:3000/v1/paginacao?paginaAtual=4&quantidadePaginas=10' \
  -H 'accept: application/json'
```

6 - Para acessar a descrição da API e/ou testar seu funcionamento, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação, basta acessar `http://localhost:3000/swagger/`.

## Desenvolvimento

A API foi desenvolvida em Node.js com Express.

Além disso, as dependências da aplicação são:

- `cors@^2.8.5` para liberação de acesso;
- `joi@^16.0.0` para validação de `schemas` e dados;
- `swagger-ui-express@^4.3.0` para criação da página visual de descrição e teste da API
- `uuid@^8.3.2` para gerar o ID da páginação
- `yamljs@^0.3.0` para leitura do arquivo `yaml` de configuração do Swagger

No ambiente de desenvolvimento ainda são usadas as dependências:

- `mocha@^9.2.0`, `chai@^4.3.6`, `chai-http@^4.30`, `chai-uuid@^1.0.6` e `sinon@^13.0.1` para os testes;
- `nyc@^15.1.0` para gerar os relatórios de cobertura de testes
- `nodemon@^2.0.15` para iniciar a aplicação com reinício automático
- `eslint@^8.8.0`, `eslint-config-trybe-backend@^1.0.4`, `eslint-plugin-import@^2.25.4`, `eslint-plugin-mocha@^10.0.3` e `eslint-plugin-sonarjs@ˆ0.11.0` para configuração do ESLint

## Arquitetura

A API está contida na pasta `/src` dentro da raiz do repositório, nela temos:

- `/api` arquivos de configuração e início da aplicação;
- `/controllers` arquivos de Controllers da aplicação;
- `/helpers` funções ou dados auxiliares
- `/middlewares` arquivos de middlewares como o de Erro e o de configuração do Swagger;
- `/routers` configuração de roteadores do Express;
- `/services` arquivos de Serviços da aplicação, como os de Paginação e Validação;
- `/tests` arquivos de testes, unitários e de integração

## Outros Scripts configurados na aplicação

* `yarn dev` ou `npm run dev` para rodar a aplicação com Nodemon e reinício automático na atualização de qualquer arquivo;
* `yarn test` ou `npm run test` para rodar todos os testes;
* `yarn test:coverage` ou `npm run test:coverage` para rodar todos os testes e gerar o relatório de cobertura na tela do terminal;
* `yarn test:coverage:report` ou `npm run test:coverage:report` para rodar todos os testes e gerar o relatório de cobertura em html, acessível na pasta `/coverage/lcov-report/`;
* `yarn test:unit` ou `npm run test:unit` para rodar apenas os testes unitários;
* `yarn test:unit:coverage` ou `npm run test:unit:coverage` para rodar apenas os testes unitários e gerar o relatório de cobertura na tela do terminal;
* `yarn test:integration` ou `npm run test:integration` para rodar apenas os testes de integração;
* `yarn test:integration:coverage` ou `npm run test:integration:coverage` para rodar apenas os testes de integração e gerar o relatório de cobertura na tela do terminal;
* `yarn lint` ou `npm run lint` para rodar o ESLint;

## Deploy

Esta aplicação está rodando na plataforma do Heroku, usando a integração direta com o GitHub.

Está acessível pelo endpoint `https://rslfilho-rarolabs.herokuapp.com/`.

É possível acessar a página Swagger da aplicação rodando e/ou testar a aplicação, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação [aqui](https://g3-deliveryapp-backend.herokuapp.com/swagger/).

## Contribuições

Fique à vontade para abrir um PR para qualquer contribuição que desejar. 

Na abertura e atualizações de PR's serão executadas duas `actions`. 
A primeira rodará o ESLint para fazer a análise estática do código, já a segunda rodará os testes da aplicação.
Aprovadas as duas `actions` e depois do CR de um dos proprietários do código, o PR poderá ser mergeado

## Contato

Desenvolvido por Roberval Filho

Email: rslfilho@gmail.com

Github: https://github.com/rslfilho

LinkedIn: https://www.linkedin.com/in/rslfilho/
