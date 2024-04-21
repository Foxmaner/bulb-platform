
/**
 * Response class to make easier communication between services and controllers
 */
class Response {
    static status(code: number) {
        const response = {
            statusCode: code,
            body: null,
            json: function (body: any) {
                this.body = body;
                return this;
            }
        };
        return {
            json: response.json.bind(response),
            send: (body: any) => {
                response.body = body;
                return response
            }
        };
    }
}


export { Response };