const Joi = require("joi");
const mongoose = require("mongoose");
const { HttpCode } = require("../../../helpers/constants");

const schemaCreateProduct = Joi.object({
    date: Joi.date().required(),
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(255).required(),
    cost: Joi.number().required(),
    image: Joi.string().min(3).max(255).required(),
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
};