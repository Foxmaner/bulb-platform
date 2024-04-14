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
}



