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

        expect(resp.status).toBe(200);
        
        const respMeeting = await req.get("/meeting") 

        expect(respMeeting.status).toBe(200);
        expect(respMeeting.body.length).toBe(1);
    }
}
