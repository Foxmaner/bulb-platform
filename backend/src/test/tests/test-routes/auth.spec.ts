import { TestDecorators } from "../../utils";


import { UserModel, MeetingModel } from "../../../models";

@TestDecorators.describeRoutes("Auth tests")
class ExempelTest {

    @TestDecorators.test("signIn")
    async createExample(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })

        expect(resp.status).toBe(201);
        
        const respMeeting = await req.get("/meeting/") 

        console.log(respMeeting.body)

        expect(respMeeting.status).toBe(200);
        expect(respMeeting.body.meetings.length).toBe(1);
    }
}
