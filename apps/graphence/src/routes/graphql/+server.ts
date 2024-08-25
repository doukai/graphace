import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const POST: RequestHandler = ({ cookies, request }) => {
    let headers = Object.fromEntries(request.headers);
    return fetch(env.PUBLIC_GRAPHQL_URL,
        {
            // propagate the request method and body
            method: request.method,
            headers: {
                ...headers,
                Authorization: cookies.get('Authorization'),
            },
            body: request.body,
            duplex: 'half'
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};