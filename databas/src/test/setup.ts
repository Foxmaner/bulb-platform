import { connectDatabase } from "../config/connection";


export default async function(): Promise<void> {
    await connectDatabase();
};