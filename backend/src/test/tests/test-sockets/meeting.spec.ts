import { TestDecorators } from "../../utils";


@TestDecorators.describeSocket("Meeting Socket tests")
class MeetingTest {
    @TestDecorators.test("Use meeting")
    async createExample(socket: any, req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        
        const meetingID = req.body.meetingID

        socket.join_room(meetingID);

        //response.expect(200);
    }

    @TestDecorators.test("Paragraphs")
    async socketTest(socket: any, req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        
        const meetingID = req.body.meetingID

        socket.join_room(meetingID);

        //response.expect(200);
    }

}
