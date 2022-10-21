const Joi = require('joi');
const mongoose = require('mongoose');
const { HttpCode } = require('../../../helpers/constants');

const schemaCreateCategory = Joi.object({
  category: Joi.string()
    .min(3)
    .max(255)
    // .pattern(new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$'))
    .required(),
  description: Joi.string()
    .min(3)
    .max(1000)
    // .pattern(new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$'))
    // .pattern(new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$'))
    .required(),
  image: Joi.string().min(3).max(255).required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: err.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationCreateCategory: (req, res, next) => {
    return validate(schemaCreateCategory, req.body, next);
  },
};
