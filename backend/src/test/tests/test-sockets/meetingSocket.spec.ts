import { TestDecorators } from "../../utils";


@TestDecorators.describeSocket("Meeting Socket tests")
class MeetingTest {

    @TestDecorators.test("Paragraphs")
    async socketTest(openSocket: any, req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        
        const meetingID = resp.body.meeting._id;

        const socket1 = await openSocket();
        const socket2 = await openSocket();

        socket2.on("section_created", (data) => {console.log(data)});
        
        await socket1.emit("join_room", meetingID);
        await socket2.emit("join_room", meetingID);

        await socket1.emit("section_create", {meetingID});
        await socket1.emit("section_create", {meetingID});

        const res = await req.get(`/meeting/${meetingID}`);
        //console.log(res.body.meeting);
        expect(res.body.meeting.mainDocumentSections.length).toBe(2);
    }

    @TestDecorators.test("Test cursor in socket")
    async cursorTest(openSocket: any, req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })

        const meetingID = resp.body.meeting._id;

        const socket1 = await openSocket();
        const socket2 = await openSocket();


        await socket1.emit("join_room", meetingID);
        const data1 = {xPos :10, yPos: 10}
        await socket1.emit("cursor_movement", data1, meetingID)

        await socket2.emit("join_room", meetingID);
        const data2 = {xPos :10, yPos: 10}
        await socket2.emit("cursor_movement", data2, meetingID)

        socket1.on("section_created", (data) => {console.log(data)});
        socket2.on("section_created", (data) => {console.log(data)});
    }
}
