const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),

  categoryId: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null),
});

const updateProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .optional(),

  categoryId: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
