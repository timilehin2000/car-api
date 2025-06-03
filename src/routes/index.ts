import { Router } from "express";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import carRouter from "./car.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/cars", carRouter);

export default router;
