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
	process.env.DB_PORT = uri;

	client.connection.on("close", () => {
		mongoServer.stop();
	});

	return { client, uri };
};

const closeDatabase = async (mongoClient: typeof mongoose): Promise<void> => {
	await mongoClient.disconnect();
};

const clearDatabase = async (mongoClient: typeof mongoose): Promise<void> => {
	await mongoClient.connection.dropDatabase();
};

export { connectDatabase, closeDatabase, clearDatabase };

