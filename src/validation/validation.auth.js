const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().optional()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports =  {registerSchema, loginSchema} ;