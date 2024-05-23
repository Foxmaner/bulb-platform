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

    const id = meeting1.body.meeting._id

    //Create section
    const section1 = await req.post('/section/create/' + id)
    expect(section1.statusCode).toBe(200)

    // Fetch the meeting again
    const updatedMeeting = await req.get('/meeting/' + id);

    // Check the number of sections in the meeting
    expect(updatedMeeting.body.meeting.sections.length).toBe(1)
}
    @TestDecorators.test("Try to create section without login")
    async createSectionWithoutLogin(req: any) {  
        const res = await req.post('/section/create/1234/' + 1)
        expect(res.statusCode).toBe(401)
    }

    @TestDecorators.test("Get section")
    async getSection(req: any) {
        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser',
        });

        //Create meeting
        const meeting1 = await req.post('/meeting/create').send({
            name:'Meeting 1'
        })

        const id = meeting1.body.meeting._id

        //Create section
        const section1 = await req.post('/section/create/' + id)
        expect(section1.statusCode).toBe(200)
        console.log("test section hi hi" + section1.body.section._id)
        console.log("test section hi hi" + id)

        const section2 = await req.post('/section/create/' + id)
        expect(section2.statusCode).toBe(200)
        console.log("test section hi hi" + section2.body.section._id)
        console.log("test section hi hi" + id)

        
        
        const getSection1 = await req.get('/section/get/' + id + '/' + section1.body.section._id)
        expect(getSection1.statusCode).toBe(200)
        expect(getSection1.body.section.name).toBe('Section 1')

        
    }
    
}