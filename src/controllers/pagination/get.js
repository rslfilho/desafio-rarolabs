const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { paginaAtual, quantidadePaginas } = req.query;
    if (!paginaAtual || !quantidadePaginas) {
      return next(errors.missingParams);
    }

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};
