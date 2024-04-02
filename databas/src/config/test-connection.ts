import { MongoMemoryServer } from 'mongodb-memory-server';

import mongoose, { ConnectOptions } from 'mongoose';

import * as dotenv from "dotenv";


dotenv.config();

const connectDatabase = async () => {
	const mongoServer = await MongoMemoryServer.create();

	const uri = mongoServer.getUri();

	if (!uri) {
		throw new Error("Mongo URI is not provided");
	}

	const db = await mongoose.connect(uri);

	db.connection.on("close", () => {
		mongoServer.stop();
	});

	return db;
};

const closeDatabase = async (mongoClient: any): Promise<void> => {
	await mongoClient.disconnect();
};

const clearDatabase = async (): Promise<void> => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
};

export { connectDatabase, closeDatabase, clearDatabase };
