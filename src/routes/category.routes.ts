import { Router } from "express";
import { handleAsyncError } from "../utils";
import { authMiddleware, authorize, validate } from "../middleware";
import { UserRoleEnum } from "../interfaces";
import { createCategoryValidation } from "../validations";
import { CategoryService } from "../services";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

categoryRouter.use(authMiddleware);

categoryRouter.use(authorize(UserRoleEnum.MANAGER));

categoryRouter.post(
    "/",
    validate(createCategoryValidation),
    handleAsyncError(categoryController.create.bind(categoryController))
);

categoryRouter.get(
    "/",
    handleAsyncError(categoryController.fetch.bind(categoryController))
);

export default categoryRouter;
