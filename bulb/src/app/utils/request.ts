
interface IRequestProps {
    url: string;
    header?: { [key: string]: string };
    body?: any;
}

export default class RequestApi {
    static post(props: IRequestProps) {
        return RequestApi.requestApi("POST", props);
    }

    static delete(props: IRequestProps) {
        return RequestApi.requestApi("DELETE", props);
    }

    static put(props: IRequestProps) {
        return RequestApi.requestApi("PUT", props);
    }

    static get(props: IRequestProps) {
        return RequestApi.requestApi("GET", props);
    }

    static requestApi(method: string, props: IRequestProps): Promise<Response> {

        const body = props.body ?? {}
        const header = props.header ?? {}

        return fetch('/api/proxy', { 
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                url: props.url,
                options: {
                    method: method,
                    header,
                    body: body
                }
            })
        });
    }
}
