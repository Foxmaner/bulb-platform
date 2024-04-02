import mongoose from "mongoose";
import { closeDatabase, connectDatabase } from "../config/test-connection";


import * as dotenv from "dotenv";

dotenv.config();


export default async function globalSetup(): Promise<void> {
    

    console.log("Jest setup");


    
    await connectDatabase();
};
