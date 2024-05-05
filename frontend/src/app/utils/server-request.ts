import { cookies } from "next/headers";


/*
 * This file is responsible for making requests to the server.
 * It has 4 methods: post, delete, put and get.
 * Each method receives an object with the url, header and body.
 * The header is optional and the body is optional too.
 * The default header is 'Content-Type': 'application/json'.
 * The default url is 'http://localhost:3001'.
 * The default method is 'GET'.
*/

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

    static async requestApi(method: string, props: IRequestProps): Promise<Response> {
        const cookieStore = cookies()
        const cookie = cookieStore.get('connect.sid');

        console.log(cookie);

        const body = props.body ?? {}
        const header = props.header ?? {}

        return fetch(`http://localhost:3001${props.url}`, { 
            method, 
            credentials: 'include',
            headers: {
                ...header,
                'Content-Type': 'application/json',
                'Cookie': `connect.sid=${cookie?.value}`,
                'Referer': props.url
            }
        });
    }
}
