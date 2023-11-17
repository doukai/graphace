import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = ({ cookies, request, params }) => {
    return fetch(`${env.PUBLIC_SCHEMA_URL}/${params.path}`, {
        // propagate the request method and body
        body: request.body,
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('Authorization'),
        },
        duplex: 'half'
    }).catch((err) => {
        console.log("Could not proxy schema API request: ", err);
        throw err;
    });
};