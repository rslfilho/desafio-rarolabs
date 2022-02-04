const { v4: uuidv4 } = require('uuid');
const validate = require('../validate');
const { getPagination } = require('../../helpers');

module.exports = async (page, pageQuantity) => {
  const { error } = validate.queryParams({ page, pageQuantity });
  if (error) return { code: 'invalidParams' };
  if (page > pageQuantity) return { code: 'pageBigger' };
  
  const pagination = getPagination(page, pageQuantity);
  const id = uuidv4();

  return { id, paginacao: pagination };
};
