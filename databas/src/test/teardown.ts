import { closeDatabase } from "../config/connection";


export default async () => {
    await closeDatabase();
};