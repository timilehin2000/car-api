import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const handleAsyncError = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export const PaginationSchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .optional()
        .allow(...[null, ""]),
    limit: Joi.number()
        .integer()
        .min(1)
        .optional()
        .allow(...[null, ""]),
    order: Joi.string()
        .valid("ASC", "DESC")
        .optional()
        .allow(...[null, ""]),
});
