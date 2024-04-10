import { TestDecorators } from "../../utils";


@TestDecorators.describeRoutes("Auth tests")
class ExempelTest {
    @TestDecorators.test("Sign up")
    async createExample(req: any) {
        const response = req.post("/auth/signUp");

        response.expect(200);
    }
}
