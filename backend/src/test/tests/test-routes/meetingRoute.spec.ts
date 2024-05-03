import exp from "constants";
import { TestDecorators } from "../../utils";

@TestDecorators.describeRoutes("Testing meeting route")
class MeetingRouteTests {

    @TestDecorators.test("Get meetings")
    async getMeetings(req: any) {   
        let res :any
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        res = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        expect(res.statusCode).toBe(201)

        res = await req.post('/meeting/create').send({
            name:'Meeting 2'
        })
        expect(res.statusCode).toBe(201)

        res = await req.get("/meeting/")
        expect(res.body.meetings.length).toBe(2);
    }

    @TestDecorators.test("Delete meetings")
    async delete(req: any) {   
        let res: any
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        res = await req.get("/meeting/")
        expect(res.body.meetings.length).toBe(1);

        res = await req.delete(`/meeting/delete/${resp.body.meeting._id}`)
        expect(res.statusCode).toBe(200)
        
        res = await req.get("/meeting/")
        expect(res.body.meetings.length).toBe(0);
    }

    @TestDecorators.test("Delete invalid meeting")
    async deleteInvalidMeeting(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        const res = await req.delete("/meeting/delete/12345");
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("meeting not found");
    }

    @TestDecorators.test("Get invalid meeting by ID")
    async getInvalidMeeting(req:any){
        let res : any
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        res = await req.get("/meeting/asdasdsada");
        expect(res.status).toBe(404)
    }

    @TestDecorators.test("Get valid meeting by ID")
    async getValidMeeting(req:any){

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        const resp = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        const id = resp.body.meeting._id

        const res = await req.get(`/meeting/${id}/`);
        expect(res.statusCode).toBe(200)
        expect(res.body.meeting._id).toBe(id)
    }

    @TestDecorators.test("Get meetings without login")
    async getMeetingsWithoutLogin(req: any) {
        const res = await req.get("/meeting/");
        expect(res.statusCode).toBe(401);  
    }

    @TestDecorators.test("Create meeting without login")
    async createWithoutLogin(req: any) {
        const res = await req.post("/meeting/create").send({ name : "Meeting"});
        expect(res.statusCode).toBe(401);
    }

    @TestDecorators.test("Delete meeting without login")
    async deleteWithoutLogin(req: any) {
        const res = await req.delete("/meeting/delete/123456");
        expect(res.statusCode).toBe(401);
    }

    @TestDecorators.test("Create meeting with invalid data")
    async createMeetingWithInvalidData(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        const res = await req.post('/meeting/create').send({
            description: 'This should fail since name is missing'
        });
        expect(res.statusCode).toBe(400); 
    }

    @TestDecorators.test("Performance test for get all meetings")
    async performanceTestForMeetingGetAllMeetings(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
    
        const start = new Date().getTime();
        const res = await req.get("/meeting/");
        const end = new Date().getTime();
    
        expect(res.statusCode).toBe(200);
        expect(end - start).toBeLessThan(300); // expect the operation to take less than 300 milliseconds
    }

    @TestDecorators.test("Create multiple meetings rapidly")
    async createMultipleMeetingsRapidly(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        for (let i = 0; i < 10; i++) {
            const res = await req.post('/meeting/create').send({
                name: `Meeting ${i}`
            });
            expect(res.statusCode).toBe(201);
        }
        
        const res = await req.get("/meeting/");
        expect(res.body.meetings.length).toBe(10);
    }

    @TestDecorators.test("Load test for large numbers of meetings")
    async loadTestLargeNumbers(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        for (let i = 0; i < 30; i++) {
            await req.post('/meeting/create').send({ name: `Meeting ${i}` });
        }

        const res = await req.get("/meeting/");
        expect(res.statusCode).toBe(200);
        expect(res.body.meetings.length).toBe(30);
    }

    @TestDecorators.test("Rename meeting")
    async renameMeeting(req: any) {
        await req.post("/login").send({
            password: "testPassword",
            name: "testUser",
        });
        let res: any;
      
        res = await req.post("/meeting/create").send({
            name: "Jesus",
        });
      
        const meeting = res.body.meeting;
        expect(meeting.name).toBe("Jesus");
      
        res = await req.put(`/meeting/rename/${meeting._id}/`).send({
            name: "Christ",
        });
        expect(res.statusCode).toBe(200);
      
        //this fails as meeting is stilled named Jesus
        res = await req.get(`/meeting/${meeting._id}/`);
        expect(res.body.meeting.name).toBe("Christ");
    }

    @TestDecorators.test("Publish test")
    async publishTest(req: any) {
        await req.post("/login").send({
           password: "testPassword",
           name: "testUser",
        });
        let res: any;
    
        await req.post("/meeting/create").send({
           name: "Meeting 1",
        });
    
        await req.post("/meeting/create").send({
           name: "Meeting 2",
        });
    
        res = await req.post("/meeting/create").send({
           name: "Jesus",
        });
        const meeting = res.body.meeting;
    
        res = await req.post(`/meeting/publish/${meeting._id}`);
        expect(res.statusCode).toBe(200);
    
        //getpublishedmeetings returns all meetings for some reason
        res = await req.get("/meeting/published");
        expect(res.statusCode).toBe(200);
        expect(res.body.meetings.length).toBe(1);
    }
    @TestDecorators.test("Change accesslevel")
    async changeaccessevel(req: any) {   
        let res: any;
        await req.post("/login").send({
          password: "testPassword",
          name: "testUser",
        });
 
        res = await req.post("/meeting/create").send({
          name: "Meeting 1",
        });
        const id = res.body.meeting_id;

        res = await req.get(`/meeting/${id}`)
        expect(res.body.meeting.members[0].role).toBe("owner")

        res = await req.put(`/meeting/accesslevel/${id}`).send({
            accessLevel : "viewer"
        })
        expect(res.statusCode).toBe(200)

        //change isnt implemented yet it seems
        res = await req.get(`/meeting/${id}`)
        expect(res.body.meeting.members[0].role).toBe("viewer")
    }
}



