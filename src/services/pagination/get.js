const validate = require('../validate');

module.exports = async (page, pageQuantity) => {
  const { error } = validate.queryParams(page, pageQuantity);
  if (error) return { code: 'invalidParams' };
};
