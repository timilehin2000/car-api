import { Router } from "express";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import carRouter from "./car.routes";

const router = Router();

router.get("/", (req, res) => {
    res.json({ status: "success", message: "API v1 is up and running 🚀" });
});

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/cars", carRouter);

export default router;
