import mongoose from "mongoose";


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
                    connection = await connectDatabase();

                    const port = process.env.PORT || 3000;

                    const { httpServer, closeServer } = run();
                    close = closeServer;
                    
                    httpServer.listen(process.env.PORT, () => {});
                    req = agent(httpServer);
                    
                });

                afterAll(async () => {
                    await closeDatabase(connection);
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


export { TestDecorators };