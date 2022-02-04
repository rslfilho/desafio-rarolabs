const validate = require('../validate');
const { getPagination } = require('../../helpers');

module.exports = async (page, pageQuantity) => {
  const { error } = validate.queryParams({ page, pageQuantity });
  if (error) return { code: 'invalidParams' };
  if (page > pageQuantity) return { code: 'pageBigger' };
  
  const pagination = getPagination(page, pageQuantity);

  return pagination;
};
