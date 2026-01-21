const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Category name must be a string",
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 3 characters",
    }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};