const Joi = require("joi");

const createStockSchema = Joi.object({
  productId: Joi.number()
    .integer()
    .positive()
    .required(),

  type: Joi.string()
    .valid("IN", "OUT")
    .required(),

  quantity: Joi.number()
    .integer()
    .positive()
    .required(),
});

module.exports = {
  createStockSchema,
};
