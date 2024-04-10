import { CompanyModel, UserModel } from "../../../models";
import { MockResponse } from 'node-mocks-http';
import { TestDecorators } from "../../utils";
import { User } from 'index';
import {expect} from '@jest/globals';
//import fetch from 'node-fetch';
import { Response } from "express";


@TestDecorators.describe("Testing meeting route")
class MeetingRouteTests {

    static async createUser(res: MockResponse<Response>){
        const params : User = {
            oAuthID: "1234",
            oAuthProvider: "google",
            name: "Gustav",
            accesLevel: 1,
            companyID: "12",
            accessibleMeetings: [123], 
            token: "asd.ass.asd"
        }
        await UserModel.create(params, res);
        const user = await res._getData;
        expect(res.statusCode).toBe(201);
        return user;
    }

    @TestDecorators.test("Get all meetings for a user")
    async getMeetings(res: MockResponse<Response>) {    
        const user = await MeetingRouteTests.createUser(res); 
        
        const response: any = await fetch('http://localhost:5000/meetings/', {
            method: 'GET',
            headers:{

            },
            body: JSON.stringify(user),
        });
        const data: any = await response.json();
        expect(response.status).toEqual(200);
        const meetings = data.meetings;
        expect(meetings.length).toBe(1);
    }

    @TestDecorators.test("Create a meeting")
    async createMeeting(res: MockResponse<Response>) {
        
     }

    @TestDecorators.test("Delete invalid meeting")
    async deleteInvalidMeeting(res: MockResponse<Response>) {
        
    }

}


//Göra statisk funktion för att skapa användare