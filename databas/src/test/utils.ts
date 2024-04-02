import httpMocks from "node-mocks-http";

import 'reflect-metadata'

import { RequestMethod } from "node-mocks-http";

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
            /*descriptor.value = async function (...args: any[]) {
                const req = httpMocks.createRequest({
                    method: method,
                    url: url,
                });
                const res = httpMocks.createResponse();

                test.only(testName, async () => {
                    await originalMethod.apply(this, [req, res, ...args]);
                });
            };*/

            let tests = Reflect.getMetadata('tests', target) || [];
            tests.push({ testName, method, url, originalMethod });
            Reflect.defineMetadata('tests', tests, target);
        };
    }

    static describe(description: string) {
        return function(constructor: new (...args: any[]) => any) {
            // Use Jest's describe block to group tests
            describe(description, () => {
              // Instantiate the class
              const instance = new constructor();
        
              // Retrieve tests metadata
              const tests: Array<{ testName: string, method: RequestMethod, url: string, originalMethod: Function }> = Reflect.getMetadata('tests', constructor.prototype) || [];
        
              // Iterate over each test and register it with Jest
              tests.forEach(test => {
                const { testName, method, url, originalMethod } = test;
        
                // Register each test case
                it(testName, async () => {
                  const req = httpMocks.createRequest({ method, url });
                  const res = httpMocks.createResponse();
                  await originalMethod.apply(instance, [req, res]);
                });
              });
            });
        }
    }
}

export { TestDecorators };
