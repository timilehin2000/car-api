import app from "./app";
import { connectDb, serverEnv } from "./config";

const startServer = async () => {
    try {
        await connectDb();

        const PORT = serverEnv.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
