import { User } from "index";
import { TestDecorators } from "../../utils";
import { CompanyModel, MeetingModel, UserModel } from "../../../models";
import { access } from "fs/promises";
import mongoose, { ObjectId } from 'mongoose';

@TestDecorators.describeRoutes("Testing meeting route")
class MeetingRouteTests {

    @TestDecorators.test("Create a meeting and get meetings")
    async getMeetings(req: any) {   

        //När Meeting nummer 2 skapas returneras error 500

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        //check 0 meetings
        const load1= await req.get("/meeting/")
        expect(load1.body.meetings.length).toBe(0)
        
        //create first meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        expect(meeting1.statusCode).toBe(201)
        expect(meeting1.body.name).toBe("Meeting 1")

        //check 1 meeting exists
        const load2 = await req.get("/meeting/")
        expect(load2.body.meetings.length).toBe(1)

        //DENNA CALL GER status 500. Bör ge 201. Kan skapa ett andra möte i testet "Multiple meetings"
        //create scondary meeting
        const meeting2 = await req.post('/meeting/create').send({
            name:'Meeting 2'
        })
        expect(meeting2.statusCode).toBe(201)

    }

    @TestDecorators.test("Delete meeting")
    async deleteMeetings(req: any) {  
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        //Create meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        //Check meeting exist
        const load1 = await req.get("/meeting/")
        expect(load1.body.meetings.length).toBe(1)

        //DELETE NOT WORKING
        //delete the meeting
        const deleted1 = await req.delete("/meeting/delete/" + meeting1.body._id)
        expect(deleted1.statusCode).toBe(200)

        //check there are no meeting left
        const load2 = await req.get("/meeting/")
        expect(load2.body.meetings.length).toBe(0)
    }

    @TestDecorators.test("Get a meeting")
    async getMeeting(req: any) {  
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        //Create meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        const id = meeting1.body._id

        //check we get correct meeting back
        const getMeeting1 = await req.get("/meeting/" + id)
        expect(getMeeting1.statusCode).toBe(200)
        expect(getMeeting1.body.name).toBe("Meeting 1")
        expect(getMeeting1.body._id).toBe(meeting1.body._id)
        expect(getMeeting1.body.date).toBe(meeting1.body.date)

        //check invalid id gives status 400
        const getMeeting2 = await req.get("/meeting/" + "12345")
        expect(getMeeting2.statusCode).toBe(400)
    }

    @TestDecorators.test("Multiple meetings")
    async multiMeetings(req: any) {  
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        //create first meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        expect(meeting1.statusCode).toBe(201)

        //create scondary meeting
        const meeting2 = await req.post('/meeting/create').send({
            name:'Meeting 2'
        })
        expect(meeting2.statusCode).toBe(201)

        //check 2 meetings exist
        const load2 = await req.get("/meeting/")
        expect(load2.body.meetings.length).toBe(2)
    }
}



/* //Lägga till möten i databasen
        const user = await UserModel.findOne({ name : "testUser" });
        
        const meetingProps = {
            name: "Meeting1",
            date: new Date(),
            completed: false
        }
        
        console.log(user)
        const meeting = await user.createMeeting(meetingProps);
        //const meetings = await MeetingModel.list()
        console.log(meeting)
        user.addMeeting(meeting._id); */


