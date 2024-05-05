import { rejects } from "assert";
import { TestDecorators } from "../../utils";
import { IParagraphEdit } from "socket";

 /*Påbörjan inte klart då brainstorm går inte att skapa än */

@TestDecorators.describeSocket("Brainstorm Socket tests")
class BrainstormTest{
    @TestDecorators.test("move cursor")
    async socketTestCursor(openSocket: any, req: any) {

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post("/meeting/create").send({
            name: 'testMeeting',
        })
        resp.code.expect(200);

        const meetingID = resp.body.meeting._id;

        const socket1 = await openSocket();

        const cursorMovedPromise = new Promise<void>((resolve) => {
            socket1.on("cursor_moved", async (cursor) => {
                    // Add expectations here to check if the cursor's x and y positions match the expected values
                    expect(cursor.xPos).toBe(10);
                    expect(cursor.yPos).toBe(10);
                    resolve();
              
            });
        });

        //const isCursorMovedCorrectly = await cursorMovedPromise;


        socket1.on("connect", () => {
            console.log("Connected");

            socket1.on("brainstorm_posted", async (brainstorm) => {
            });

            socket1.on("cursor_moved", async (cursor) => {
            });

            socket1.emit("join_room", meetingID);
            socket1.emit("section_create", {meetingID});
            socket1.emit("cursor_move", {xPos: 10, yPos: 10});
        });


        const socket2 = await openSocket();

        socket2.on("connect", () => {
            socket2.on("cursor_moved", async (cursor) => {
            });

            socket2.emit("join_room", meetingID);
            socket2.emit("cursor_move", {xPos: 20, yPos: 20});
        });

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:3});
            }, 1000);
        })
        //expect(isCursorMovedCorrectly).toBe(true);

    }

    @TestDecorators.test("create note")
    async createNoteTest(openSocket: any, req: any) {
        // Login and create meeting code here...

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

            socket1.on("create_note", async (brainstorm) => {
            });

            socket1.on("moved_note", async (cursor) => {
            });

            socket1.emit("join_room", meetingID);
            socket1.emit("move_note", {xPos: 10, yPos: 10});
        });

        const socket2 = await openSocket();

        socket2.on("connect", () => {
            socket2.on("note_deleted", async (cursor) => {
            });

            socket2.emit("join_room", meetingID);
            socket2.emit("delte", {xPos: 20, yPos: 20});
        });

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:3});
            }, 1000);
        })
    }
}