import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initDeadlineTracker } from "./utils/deadlineTracker.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

let server: any;

const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        console.log("Database online. Alert engines primed.");

        initDeadlineTracker();

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();

process.on("SIGINT", () => {
    console.log("\nServer shutting down...");

    if (server) {
        server.close(() => {
            console.log("Server closed gracefully");
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});
