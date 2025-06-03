import { config } from "dotenv";

config();

export const databaseEnv = {
    DB_URL: process.env.DB_URL,
};

export const serverEnv = {
    PORT: process.env.PORT || "3000",
    JWT_SECRET: process.env.JWT_SECRET as string,
};
