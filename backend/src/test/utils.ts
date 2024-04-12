import mongoose from "mongoose";

import { google, Auth } from "googleapis";


import "reflect-metadata";

import {
    clearDatabase,
    closeDatabase,
    connectDatabase,
} from "../config/test-connection";

import { run } from "../app";

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
                let close: any;

                beforeAll(async () => {
                    const { client, uri } = await connectDatabase();
                    connection = client;

                    const port = process.env.PORT || 3000;

                    console.log(`Testing Port is set to ${port}`);

                    const { httpServer, closeServer } = run(uri);
                    close = closeServer;
                    
                    httpServer.listen(process.env.PORT, () => {});
                    req = agent(httpServer);
                    
                });

                afterAll(async () => {
                    await closeDatabase(connection);
                    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error

                    await close();
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
                    const { client, uri } = await connectDatabase();
                    connection = client;
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