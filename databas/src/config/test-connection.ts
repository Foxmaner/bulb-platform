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

	process.env.TEST_ENV = "true";
	process.env.MONGO_URI = uri;

	client.connection.on("close", () => {
		mongoServer.stop();
	});

	return client;
};

const closeDatabase = async (mongoClient: typeof mongoose): Promise<void> => {
	await mongoClient.disconnect();
};

const clearDatabase = async (clearDatabase: typeof mongoose): Promise<void> => {
	await clearDatabase.connection.dropDatabase();
};

export { connectDatabase, closeDatabase, clearDatabase };
