const errors = {
  missingParams: {
    statusCode: 400,
    code: 'bad_request',
    message: 'Missins query params "paginaAtual" and/or "quantidadePaginas"',
  },
  invalidParams: {
    statusCode: 400,
    code: 'bad_request',
    message: 'Invalid query params "paginaAtual" and/or "quantidadePaginas"',
  },
};

module.exports = errors;
