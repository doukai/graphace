import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const POST: RequestHandler = ({ cookies, request }) => {
    let headers = Object.fromEntries(request.headers);
    if(!headers['Authorization'] && !headers['authorization']){
        headers['Authorization'] = cookies.get('Authorization');
    }
    return fetch(env.PUBLIC_GRAPHQL_URL,
        {
            // propagate the request method and body
            method: request.method,
            headers: headers,
            body: request.body,
            duplex: 'half'
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};