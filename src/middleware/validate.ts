import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import mongoose from "mongoose";
import { HttpError } from "../utils/errors.utils";

export const validate =
    (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return next(
                new HttpError(
                    error.details.at(0)?.message || "Validation error",
                    400
                )
            );
        }

        next();
    };

const ObjectIdSchema = Joi.string()
    .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "ObjectId validation")
    .messages({
        "any.invalid": "Invalid ObjectId format",
    });

export const validateParamsIds = (ids: string[]) => {
    const schema = Joi.object(
        ids.reduce(
            (acc, id) => ({
                ...acc,
                [id]: ObjectIdSchema.required(),
            }),
            {}
        )
    );

    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);

        if (error) {
            return next(
                new HttpError(
                    error.details.at(0)?.message || "Validation error",
                    400
                )
            );
        }

        next();
    };
};
