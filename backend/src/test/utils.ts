import mongoose from "mongoose";
import ioc from "socket.io-client"

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

/**
 * Decorator for test functions
 */
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

    /**
     * 
     *  Describe routes for testing routes
     *  It sets up for testing routes
     */
    static describeRoutes<T>(description: string) {
        return (constructor: new () => T) => {
            describe(description, () => {
                let connection: typeof mongoose;
                let req: any;
                let closeServer: any;
                let httpServer: any;
                let io: any;

                beforeAll(async () => {
                    const port = process.env.PORT || 3000;

                    const { 
                        httpServer: localHttpServer, 
                        closeServer: localCloseServer, 
                        io: localIo,
                        connectDB
                    } = await run();  // Correct destructuring with variable declaration

                    connection = connectDB;
                    httpServer = localHttpServer;
                    closeServer = localCloseServer;
                    io = localIo;
                    
                    httpServer.listen(port, () => {});
                    req = agent(httpServer);
                    
                });

                afterAll(async () => {
                    await closeDatabase(connection);
                    await closeServer();
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

    /**
     * 
     *  Describe socket for testing socket
     *  It sets up for testing socket
     */
    static describeSocket<T>(description: string) {
        return (constructor: new () => T) => {
            describe(description, () => {
                let connection: typeof mongoose;
                let httpServer: any;
                let req: any;
                let closeServer: any;
                let io: any;

                const openSocket = async () => {
                    const port = process.env.PORT || 3001;

                    const socket = ioc(`http://localhost:${port}`);

                    return socket;
                }

                beforeAll(async () => {
                    const port = process.env.PORT || 3001;

                    const { 
                        httpServer: localHttpServer, 
                        closeServer: localCloseServer, 
                        io: localIo,
                        connectDB
                    } = await run();  // Correct destructuring with variable declaration

                    connection = connectDB;
                    httpServer = localHttpServer;
                    closeServer = localCloseServer;
                    io = localIo;

                    httpServer.listen(port, () => {});
                    req = agent(httpServer);
                });

                afterAll(async () => {
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                          resolve({id: 3});
                        }, 1000);
                    });
                    //await io.close();
                    //await closeDatabase(connection);
                    await closeServer();
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
                        await originalMethod.apply(instance, [openSocket, req]);
                    });
                });
            });
        };
    }

    /**
     * 
     *  Describe models for testing models
     *  It sets up for testing models
     */
    static describeModels<T>(description: string) {
        return (constructor: new () => T) => {
            describe(description, () => {
                let connection: typeof mongoose;

                beforeAll(async () => {
                    console.log("AAAA")
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