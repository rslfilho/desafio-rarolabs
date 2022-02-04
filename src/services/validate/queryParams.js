const Joi = require('joi');

const schema = Joi.object({
  page: Joi.number()
    .required(),
  pageQuantity: Joi.number()
    .required(),
});
  
module.exports = (obj) => schema.validate(obj);
