import { User } from "index";
import { TestDecorators } from "../../utils";
import { CompanyModel, MeetingModel, UserModel } from "../../../models";
import { access } from "fs/promises";


@TestDecorators.describeRoutes("Testing meeting route")
class MeetingRouteTests {

    @TestDecorators.test("Get meetings")
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
        console.log(resp._body)
        expect(resp._body.length).toBe(2);
    }

    @TestDecorators.test("Delete meetings")
    async delete(req: any) {   

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        const res = await req.get("/meeting/")

        await req.delete(`/meeting/delete/${res._body[0]}`)
        const resp = await req.get("/meeting/")

        expect(resp._body.length).toBe(0);
    }

    @TestDecorators.test("Get invalid meeting by ID")
    async getInvalidMeeting(req:any){
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        const res = await req.get("/meeting/asdasdsada");
        expect(res._body.length).toBe(0)
    }

    @TestDecorators.test("Get invalid meeting by ID")
    async getValidMeeting(req:any){
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
        
        await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        const res = await req.get("/meeting/asdasdsada");
        expect(res._body.length).toBe(0)
    }



}

//Kanske ett problem men det ser inte ut som en user kan skapa ett möte två gånger, kör koden ovan 


