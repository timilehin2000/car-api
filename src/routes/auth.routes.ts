import { Router } from "express";
import {
    loginValidation,
    registerValidation,
} from "../validations/auth.validation";
import { AuthController } from "../controllers";
import { handleAsyncError } from "../utils";
import { UserService } from "../services/user.service";
import { validate } from "../middleware";

const authRouter = Router();

const userService = new UserService();
const authController = new AuthController(userService);

authRouter.post(
    "/register",
    validate(registerValidation),
    handleAsyncError(authController.registerUser.bind(authController))
);

authRouter.post(
    "/login",
    validate(loginValidation),
    handleAsyncError(authController.login.bind(authController))
);

export default authRouter;
