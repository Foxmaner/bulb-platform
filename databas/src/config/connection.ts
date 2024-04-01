import mongoose from 'mongoose';

import * as dotenv from "dotenv";
import * as config from "./db.config.json";


dotenv.config();

export function connectDatabase(): void {
    try {

        const uri = process.env.DB_URI as string;

        if (!uri) {
            throw new Error("DB_URI is not defined");
        }

        mongoose.connect(uri, config);

        const db = mongoose.connection;

        db.on(
            "error",
            console.error.bind(console, "MongoDB connection error:")
        );
        db.once("open", () => console.log("Connected to MongoDB"));

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export async function closeDatabase() {
    await mongoose.connection.close();
}