const { v4: uuidv4 } = require('uuid');
const validate = require('../validate');
const { getPagination, errors } = require('../../helpers');

module.exports = async (page, pageQuantity) => {
  const { error } = validate.queryParams({ page, pageQuantity });
  if (error) throw errors.invalidParams;
  if (page > pageQuantity) throw errors.pageBigger;
  
  const pagination = getPagination(page, pageQuantity);
  const id = uuidv4();

  return { id, paginacao: pagination };
};
