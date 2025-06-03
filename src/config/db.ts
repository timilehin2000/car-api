import mongoose from "mongoose";
import { databaseEnv } from "./env.config";

const uri = databaseEnv.DB_URL!;

export const connectDb = async () => {
    try {
        await mongoose.connect(uri);

        console.log("Database is connected");
    } catch (err) {
        console.log(err);
    }
};
