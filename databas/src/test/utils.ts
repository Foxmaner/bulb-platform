import httpMocks from "node-mocks-http";

import mongoose from "mongoose";

import "reflect-metadata";

import { RequestMethod } from "node-mocks-http";
import {
    clearDatabase,
    closeDatabase,
    connectDatabase,
} from "../config/test-connection";


import { httpServer } from "../app";

import { request, agent } from 'supertest';

interface TestFnProps {
    testName: string;
    method: RequestMethod;
    url: string;
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

    static describe<T>(description: string) {
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
                        const res = httpMocks.createResponse();

                        await originalMethod.apply(instance, [res]);
                    });
                });
            });
        };
    }
}


export { TestDecorators };
