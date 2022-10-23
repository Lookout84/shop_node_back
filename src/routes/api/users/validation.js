const Joi = require('joi');
const mongoose = require('mongoose');
const { HttpCode } = require('../../../helpers/constants');

const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].{8,}$/;
const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
const stringPhoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const schemaCreateUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
  phone: Joi.string().pattern(new RegExp(stringPhoneRegex)).required(),
  role: Joi.string().min(3).max(30),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(stringPhoneRegex)).required(),
  country: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(255).required(),
});

const schemaUpdateUserPassword = Joi.object({
  password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
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
  validationCreateUser: (req, res, next) => {
    return validate(schemaCreateUser, req.body, next);
  },
  validationLoginUser: (req, res, next) => {
    return validate(schemaLoginUser, req.body, next);
  },
  validationUpdateUser: (req, res, next) => {
    return validate(schemaUpdateUser, req.body, next);
  },
  validationUpdatePassword: (req, res, next) => {
    return validate(schemaUpdateUserPassword, req.body, next);
  }
};
