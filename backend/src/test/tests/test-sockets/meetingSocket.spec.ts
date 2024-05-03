import { TestDecorators } from "../../utils";
import { IParagraphEdit } from "socket";
import Delta from "quill-delta";
@TestDecorators.describeSocket("Meeting Socket tests")
class MeetingTest {

    @TestDecorators.test("Sections")
    async socketTestSection(openSocket: any, req: any) {

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })

        const meetingID = resp.body.meeting._id;

        const socket1 = await openSocket();

        socket1.on("connect", () => {
            console.log("Connected");

            socket1.on("section_created", async (section) => {
            });

            socket1.emit("join_room", meetingID);
            socket1.emit("section_create", {meetingID});
        });

        const socket2 = await openSocket();

        socket2.on("connect", () => {
            socket2.on("section_created", async (section) => {
            });
    
            socket2.emit("join_room", meetingID);
            socket2.emit("section_create", {meetingID});
        });

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:3});
            }, 1000);
        })
        
    }

    @TestDecorators.test("Paragraphs")
    async socketTestParagraph(openSocket: any, req: any) {

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        const meetingID = resp.body.meeting._id;

        const socket1 = await openSocket();

        socket1.on("connect", () => {
            console.log("Connected");

            socket1.on("section_created", async (section) => {
            });

            socket1.on("paragraph_created", async (paragraph) => {
            });

            //socket1.emit("section_paragraph", {meetingID, sectionID});
            socket1.emit("join_room", meetingID);


        });

        const socket2 = await openSocket();

        socket2.on("connect", async () => {
    
            socket2.emit("join_room", meetingID);
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 50);
            })
            socket2.emit("section_create", {meetingID});
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 100);
            })
            socket2.emit("section_create", {meetingID});
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 100);
            })
            socket2.emit("section_create", {meetingID});


            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 300);
            })

            const resp2 = await req.get(`/meeting/${meetingID}`);
            const section = resp2.body.meeting.sections[0];
            const sectionID = section._id;
            const paramsCreate = {meetingID, sectionID}
            socket2.emit("paragraph_create", paramsCreate);

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 300);
            })

            socket2.emit("paragraph_create", paramsCreate);


            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({id:3});
                }, 50);
            })

            const resp3 = await req.get(`/meeting/${meetingID}`);
            const tmp = resp3.body.meeting.sections;
            console.log(111, tmp);
            const paragraphID = tmp[0].contains[0]._id;
            // const patches = [{
            //     diffs: [ [ 1, 'Hello World!' ] ],
            //     start1: 0,
            //     start2: 0,
            //     length1: 0,
            //     length2: 12
            // }]
            let change = new Delta().insert('Hello, ').ops;
            console.log(change);
            const paramEdit : IParagraphEdit = {meetingID, sectionID, paragraphID, change}
            socket2.emit("paragraph_edit", paramEdit);

            //change = new Delta().retain(7).insert('world!');


        });

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:3});
            }, 1000);
        })
        
    }

    // @TestDecorators.test("Test cursor in socket")
    // async cursorTest(openSocket: any, req: any) {
    //     await req.post("/login").send({
    //         password: 'testPassword',
    //         name: 'testUser',
    //     });
        
    //     const resp = await req.post("/meeting/create").send({
    //         name: 'testMeeting',
    //     })

    //     const meetingID = resp.body.meeting._id;

    //     const socket1 = await openSocket();
    //     const socket2 = await openSocket();


    //     await socket1.emit("join_room", meetingID);
    //     const data1 = {xPos :10, yPos: 10}
    //     await socket1.emit("cursor_movement", data1, meetingID)

    //     await socket2.emit("join_room", meetingID);
    //     const data2 = {xPos :10, yPos: 10}
    //     await socket2.emit("cursor_movement", data2, meetingID)

    //     socket1.on("section_created", (data) => {console.log(data)});
    //     socket2.on("section_created", (data) => {console.log(data)});
    // }
}
