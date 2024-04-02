import { closeDatabase } from "../config/connection";


export default async function(): Promise<void> {
    await closeDatabase();
};