import mongoose from "mongoose";

import { google, Auth } from "googleapis";


import "reflect-metadata";

import {
    clearDatabase,
    closeDatabase,
    connectDatabase,
} from "../config/test-connection";

//import { httpServer } from "../app";

import { agent } from 'supertest';


interface TestFnProps {
    testName: string;
    originalMethod: Function;
}

class TestDecorators {
    static test(
        testName: string,
    ) {
        return (
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) => {
            const originalMethod = descriptor.value;
            const tests = Reflect.getMetadata("tests", target) || [];
            tests.push({ testName, originalMethod });
            Reflect.defineMetadata("tests", tests, target);
        };
    }

    static describeRoutes<T>(description: string) {
        return (constructor: new () => T) => {
            describe(description, () => {
                let connection: typeof mongoose;
                let req: any;
                let server: any;

                beforeAll(async () => {
                    connection = await connectDatabase();

                    const port = process.env.PORT || 3000;

                    if (!port) {
                        throw new Error("Port is not set in .env file");
                    } 

                    console.log(`Port is set to ${port}`);

                    //server = httpServer.listen(process.env.PORT, () => {});
                    req = agent(server);
                });

                afterAll(async () => {
                    await closeDatabase(connection);
                    
                    server.close();
                });

                beforeEach(async () => {
                    await clearDatabase(connection);
                });

                const instance = new constructor();
                const cls = constructor.prototype;

                const tests: Array<TestFnProps> =
                    Reflect.getMetadata("tests", cls) || [];

                tests.forEach((testProps: TestFnProps) => {
                    const { testName, originalMethod } = testProps;

                    test.only(testName, async () => {
                        await originalMethod.apply(instance, [req]);
                    });
                });
            });
        };
    }

    static describeModels<T>(description: string) {
        return (constructor: new () => T) => {
            describe(description, () => {
                let connection: typeof mongoose;

                beforeAll(async () => {
                    connection = await connectDatabase();
                });

                afterAll(async () => {
                    await closeDatabase(connection);
                });

                beforeEach(async () => {
                    await clearDatabase(connection);
                });

                const instance = new constructor();
                const cls = constructor.prototype;

                const tests: Array<TestFnProps> =
                    Reflect.getMetadata("tests", cls) || [];

                tests.forEach((testProps: TestFnProps) => {
                    const { testName, originalMethod } = testProps;

                    test.only(testName, async () => {

                        await originalMethod.apply(instance, []);
                    });
                });
            });
        };
    }
}

export class GoogleAuthService {
    oauthClient: Auth.OAuth2Client;
    constructor(
    ) {
        const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
        
        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }
}

export { TestDecorators };