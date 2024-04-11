import { CompanyModel, UserModel } from "../../../models";

import { TestDecorators } from "../../utils";
import { User } from 'index';
import {expect} from '@jest/globals';
//import fetch from 'node-fetch';
import { Response } from "express";


@TestDecorators.describeRoutes("Testing meeting route")
class MeetingRouteTests {

    static async createUser(){
        const params : User = {
            oAuthID: "1234",
            oAuthProvider: "google",
            name: "Gustav",
            accesLevel: 1,
            companyID: "12",
            accessibleMeetings: [123]
        }
        const resp = await UserModel.create(params);

        expect(resp.statusCode).toBe(201);
        return resp.body.user;
    }

    @TestDecorators.test("Get all meetings for a user")
    async getMeetings() {    
        const user = await MeetingRouteTests.createUser(); 
        
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
    async createMeeting() {
        
     }

    @TestDecorators.test("Delete invalid meeting")
    async deleteInvalidMeeting() {
        
    }

}


//Göra statisk funktion för att skapa användare