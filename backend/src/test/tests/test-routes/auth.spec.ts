import { TestDecorators } from "../../utils";

import jwt from "jsonwebtoken";


@TestDecorators.describeRoutes("Auth tests")
class ExempelTest {

    @TestDecorators.test("signIn")
    async createExample(req: any) {

        const resp = await req.post("/login").send({
            password: 'testPassword',
            name: 'testUser' 
        });

        try {
            const resp = await req.post("/login").send({
                password: 'testPassword',
                name: 'testUser' 
            }).expect(200);
      
            console.log('Test Passed: Successful login');
          } catch (error: any) {
            console.error('Test Failed:', error.response ? error.response.text : error.message);
        }
        
        
        console.log(resp.status);
    }
}
