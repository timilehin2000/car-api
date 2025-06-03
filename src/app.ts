import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { notFound } from "./middleware";
import routes from "./routes";
import { HttpError } from "./utils/errors.utils";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

app.use(notFound);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default app;
