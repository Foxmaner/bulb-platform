import { CompanyModel, UserModel } from "../../../models";
import { MockResponse, createMocks } from 'node-mocks-http';
import { TestDecorators } from "../../utils";
import {expect} from '@jest/globals';
import { Response } from "express";
import httpMocks from "node-mocks-http";


@TestDecorators.describeModels("Testing meeting route")
class MeetingRouteTests {

    static async createUser(res: MockResponse<Response>){
        const userParams = {
			oAuthID: "123",
			oAuthProvider: "google",
			name: "User1",
			accesLevel: 1,
		}
        await UserModel.create(userParams, res);
        const user = await res._getData;
        expect(res.statusCode).toBe(201);
        return user;
    }

    @TestDecorators.test("Test meetings")
    async createExample(req: any) {
        const res = httpMocks.createResponse();
        const user =  MeetingRouteTests.createUser(res);

        expect(user).toBe("asda")
        //Varför får jag ingen response när jag kör, får det när jag postman???????
        const response = await req.get("/meeting/", {
            header : {

            }, body : {
                "user" : user,
            }
        });
        expect(response).toBe(200);
    }

}


