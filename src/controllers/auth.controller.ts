import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class AuthController {
    constructor(private userService: UserService) {}

    async registerUser(req: Request, res: Response) {
        const data = req.body;

        const user = await this.userService.registerUser(data);

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: user,
        });
    }

    async login(req: Request, res: Response) {
        const data = req.body;

        const user = await this.userService.login(data);

        return res.status(201).json({
            status: "success",
            message: "Login successfully",
            data: user,
        });
    }
}
