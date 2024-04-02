import httpMocks from "node-mocks-http";

import "reflect-metadata";

import { RequestMethod } from "node-mocks-http";

interface TestFnProps {
    testName: string;
    method: RequestMethod;
    url: string;
    originalMethod: Function;
}

class TestDecorators {
    static post(testName: string, url: string) {
        return TestDecorators.testDecorator(testName, "POST", url);
    }

    static get(testName: string, url: string) {
        return TestDecorators.testDecorator(testName, "GET", url);
    }

    static put(testName: string, url: string) {
        return TestDecorators.testDecorator(testName, "PUT", url);
    }

    static delete(testName: string, url: string) {
        return TestDecorators.testDecorator(testName, "DELETE", url);
    }

    private static testDecorator(
        testName: string,
        method: RequestMethod,
        url: string
    ) {
        return function (
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;
            let tests = Reflect.getMetadata("tests", target) || [];
            tests.push({ testName, method, url, originalMethod });
            Reflect.defineMetadata("tests", tests, target);
        };
    }

    static describe(description: string) {
        return function (constructor: new (...args: any[]) => any) {
            describe(description, () => {
                const instance = new constructor();
                const cls = constructor.prototype;

                const tests: Array<TestFnProps> =
                    Reflect.getMetadata("tests", cls) || [];

                tests.forEach((testProps: TestFnProps) => {
                    const { testName, method, url, originalMethod } = testProps;

                    test.only(testName, async () => {
                        const req = httpMocks.createRequest({ method, url });
                        const res = httpMocks.createResponse();
                        await originalMethod.apply(instance, [req, res]);
                    }, 15000);
                });
            });
        };
    }
}

export { TestDecorators };
