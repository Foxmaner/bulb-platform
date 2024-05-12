import exp from "constants";
import { TestDecorators } from "../../utils";

@TestDecorators.describeRoutes("Testing paragraph route")
class ParagraphRouteTests {

    @TestDecorators.test("Create paragraph")
    async createparagraph(req: any) {   
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
    async 

}