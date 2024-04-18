import { TestDecorators } from "../../utils";


@TestDecorators.describeSocket("Meeting Socket tests")
class MeetingTest {

    @TestDecorators.test("Join room")
    async createExample(socket: any, req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        
        const meetingID = resp.body.meeting._id;
        
        socket.emit("join_room", meetingID);

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
        
        const meetingID = resp.body.meeting._id;

        socket.emit("join_room", meetingID);

    }

}
