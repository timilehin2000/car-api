import { Router } from "express";
import { handleAsyncError } from "../utils";
import {
    authMiddleware,
    authorize,
    validate,
    validateParamsIds,
} from "../middleware";
import { UserRoleEnum } from "../interfaces";
import { createCarValidation, updateCarValidation } from "../validations";
import { CarService, CategoryService } from "../services";
import { CarController } from "../controllers";

const carRouter = Router();

const categoryService = new CategoryService();
const carService = new CarService(categoryService);
const carController = new CarController(carService);

carRouter.use(authMiddleware);

carRouter.use(authorize(UserRoleEnum.MANAGER));

carRouter.post(
    "/",
    validate(createCarValidation),
    handleAsyncError(carController.create.bind(carController))
);

carRouter.get(
    "/",
    handleAsyncError(carController.fetchAll.bind(carController))
);

carRouter.get(
    "/:carId",
    validateParamsIds(["carId"]),
    handleAsyncError(carController.fetch.bind(carController))
);

carRouter.patch(
    "/:carId",
    validateParamsIds(["carId"]),
    validate(updateCarValidation),
    handleAsyncError(carController.update.bind(carController))
);

carRouter.delete(
    "/:carId",
    validateParamsIds(["carId"]),
    handleAsyncError(carController.remove.bind(carController))
);

export default carRouter;
