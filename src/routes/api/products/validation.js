const Joi = require("joi");
const mongoose = require("mongoose");
const { HttpCode } = require("../../../helpers/constants");

const schemaCreateProduct = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(1000).required(),
    category: Joi.array().min(3).max(100),
    picture: Joi.string().min(3).max(255).required(),
});

const schemaUpdateProduct = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(1000).required(),
    category: Joi.array().min(3).max(100),
    picture: Joi.string().min(3).max(255).required(),
});

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    } catch (err) {
        next({
            status: HttpCode.BAD_REQUEST,
            message: err.message.replace(/"/g, ""),
        });
    }
};

module.exports = {
    validationCreateProduct: (req, res, next) => {
        return validate(schemaCreateProduct, req.body, next);
    },
    validationUpdateProduct: (req, res, next) => {
        return validate(schemaUpdateProduct, req.body, next);
    },
};