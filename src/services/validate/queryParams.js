const Joi = require('joi');

const schema = Joi.object({
  page: Joi.string
    .required(),
  pageQuantity: Joi.string()
    .required(),
});
  
module.exports = (obj) => schema.validate(obj);
