const paginationService = require('../../services/pagination');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { paginaAtual: page, quantidadePaginas: pageQuantity } = req.query;
    if (!page || !pageQuantity) throw errors.missingParams;

    const response = await paginationService.get(+page, +pageQuantity);

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
