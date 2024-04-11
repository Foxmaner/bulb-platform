import { TestDecorators } from "../../utils";

//Body för post används supertest
@TestDecorators.describeRoutes("Example tests")
class ExempelTest {
    @TestDecorators.test("Create a example")
    async createExample(req: any) {
        const response = req.get("/user/")

        response.expect(200);
    }

}
