import { MongoMemoryServer } from 'mongodb-memory-server';

import mongoose from 'mongoose';

import * as dotenv from "dotenv";


dotenv.config();

const connectDatabase = async () => {
	const mongoServer = await MongoMemoryServer.create();

	const uri = mongoServer.getUri();

	if (!uri) {
		throw new Error("Mongo URI is not provided");
	}

	const client = await mongoose.connect(uri);

	client.connection.on("close", () => {
		mongoServer.stop();
	});

	const db = client.connection.db;

	return { connection: client, db };
};

const closeDatabase = async (mongoClient: any): Promise<void> => {
	await mongoClient.disconnect();
};

const clearDatabase = async (clearDatabase: any): Promise<void> => {
	await clearDatabase.connection.dropDatabase();
};

export { connectDatabase, closeDatabase, clearDatabase };
