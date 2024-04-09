import { TestDecorators } from "../../utils";


@TestDecorators.describeRoutes("Example tests")
class ExempelTest {
    @TestDecorators.test("Create a example")
    async createExample(req: any) {
        const response = req.get("/user/")

        response.expect(200);
    }

}
