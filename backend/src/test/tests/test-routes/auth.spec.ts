import { TestDecorators } from "../../utils";

import jwt from "jsonwebtoken";


@TestDecorators.describeRoutes("Auth tests")
class ExempelTest {

    static async generateFakeToken() {

        if (process.env.JWT_SECRET === undefined) {
            throw new Error("JWT_SECRET not defined");
        }

        const token = jwt.sign({}, process.env.JWT_SECRET)

        return token;
    }

    @TestDecorators.test("signIn")
    async createExample(req: any) {


        /*const resp = await req.post("/auth/signIn")
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          email: "test@gmail.com",
          name: "test user"
        });*/


        //expect(resp.statusCode).toBe(200);
    }
}
