import Joi from "joi";

const createCategoryValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
});

export { createCategoryValidation };
