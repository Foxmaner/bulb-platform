import mongoose from 'mongoose';

import * as dotenv from "dotenv";
import * as config from "../../db.config.json";


dotenv.config();

export async function connectDatabase() {
    try {

        const uri = process.env.DB_URI as string;

        if (!uri) {
            throw new Error("DB_URI is not defined");
        }

        console.log(config)

        await mongoose.connect(uri);

        const db = mongoose.connection;

        console.log("Connected to MongoDB")

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export async function closeDatabase() {
    await mongoose.connection.close();
}