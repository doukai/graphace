import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const POST: RequestHandler = ({ cookies, request }) => {
    return fetch(env.PUBLIC_GRAPHQL_URL, {
        // propagate the request method and body
        body: request.body,
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('Authorization'),
        },
        duplex: 'half'
    }).catch((err) => {
        console.log("Could not proxy graphql API request: ", err);
        throw err;
    });
};