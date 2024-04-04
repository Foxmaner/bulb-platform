import httpMocks from "node-mocks-http";

import mongoose from "mongoose";

import "reflect-metadata";

import { RequestMethod } from "node-mocks-http";
import {
    clearDatabase,
    closeDatabase,
    connectDatabase,
} from "../config/test-connection";

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
        return function (
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;
            let tests = Reflect.getMetadata("tests", target) || [];
            tests.push({ testName, originalMethod });
            Reflect.defineMetadata("tests", tests, target);
        };
    }

    static describe(description: string) {
        return function (constructor: new (...args: any[]) => any) {
            describe(description, () => {
                let connection: typeof mongoose;
                let db: any;

                beforeAll(async () => {
                    ({ connection, db } = await connectDatabase());
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
