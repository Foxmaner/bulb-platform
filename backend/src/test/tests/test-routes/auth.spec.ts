import { TestDecorators } from "../../utils";


@TestDecorators.describeRoutes("Auth tests")
class ExempelTest {

    @TestDecorators.test("signIn")
    async createExample(req: any) {

        await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser' 
        });

        const resp = await req.post("/history/create");
        
        console.log(resp.status);
    }
}
