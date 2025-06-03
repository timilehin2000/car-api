import Joi from "joi";

const createCarValidation = Joi.object({
    categoryId: Joi.string().required(),
    brand: Joi.string().required(),
    carModel: Joi.string().required(),
    year: Joi.number().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
    mileage: Joi.number().required(),
});

const updateCarValidation = Joi.object({
    brand: Joi.string().optional(),
    carModel: Joi.string().optional(),
    year: Joi.number().optional(),
    price: Joi.number().optional(),
    color: Joi.string().optional(),
    mileage: Joi.number().optional(),
});

export { createCarValidation, updateCarValidation };
