const Joi = require('joi');
const mongoose = require('mongoose');
const { HttpCode } = require('../../../helpers/constants');

const schemaCreateOrder = Joi.object({
  date: Joi.date().required(),
  amountProduct: Joi.number().required(),
  costProduct: Joi.number().required(),
  total: Joi.number().required(),
  productId: Joi.string().required(),
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
  validationCreateOrder: (req, res, next) => {
    return validate(schemaCreateOrder, req.body, next);
  },
};
