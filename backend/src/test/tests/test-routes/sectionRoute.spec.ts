import { TestDecorators } from "../../utils";


@TestDecorators.describeRoutes("Testing section routes")
class MeetingRouteTests {
    @TestDecorators.test("Create section ")
    async createSection(req: any) {  
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });
    
        //Create meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })
        const id = meeting1.body._id
    
        //addSection krånglar. sections.length är odefinierad
        //Create section
        const section1 = await req.post('/section/create/' + id)
        expect(section1.statusCode).toBe(200)
    }
}