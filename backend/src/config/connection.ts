import mongoose from 'mongoose';
import * as dotenv from "dotenv";


//dotenv.config();

export async function connectDatabase() {
    try {

        if (process.env.TEST) {
            return;
        }

        const uri = process.env.DB_URI as string;
        console.log(uri);
        if (!uri) {
            throw new Error("DB_URI is not defined");
        }

        await mongoose.connect(uri);

        const db = mongoose.connection;

        console.log("Connected to MongoDB")
        
        return db;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export async function closeDatabase() {
    await mongoose.disconnect();
}