import httpMocks from 'node-mocks-http';

import { RequestMethod } from 'node-mocks-http';


class TestDecorators {
  static post(testName: string, url: string) {
    return TestDecorators.testDecorator(testName, 'POST', url);
  }

  static get(testName: string, url: string) {
    return TestDecorators.testDecorator(testName, 'GET', url);
  }

  static put(testName: string, url: string) {
    return TestDecorators.testDecorator(testName, 'PUT', url);
  }

  static delete(testName: string, url: string) {
    return TestDecorators.testDecorator(testName, 'DELETE', url);
  }

  private static testDecorator(testName: string, method: RequestMethod, url: string) {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        const req = httpMocks.createRequest({
          method: method,
          url: url,
        });
        const res = httpMocks.createResponse();

        test(testName, async () => {
          await originalMethod.apply(this, [req, res, ...args]);
        });
      };
    };
  }
}




export { TestDecorators };
