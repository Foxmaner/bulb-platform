import { User } from "index";
import { TestDecorators } from "../../utils";
import { CompanyModel, MeetingModel, UserModel } from "../../../models";
import { access } from "fs/promises";


@TestDecorators.describeRoutes("Testing meeting route")
class MeetingRouteTests {

    @TestDecorators.test("Create a meeting and get meeting")
    async getMeetings(req: any) {   

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        await req.post('/meeting/create').send({
            name:'Meeting 2'
        })

        const resp = await req.get("/meeting/")
        const meetings = resp.body.meetings;
        expect(meetings.length).toBe(2)
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


