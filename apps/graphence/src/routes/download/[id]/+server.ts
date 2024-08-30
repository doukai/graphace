import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = ({ cookies, request, params }) => {
    let headers = Object.fromEntries(request.headers);
    return fetch(env.PUBLIC_DOWNLOAD_URL + "/" + params.id,
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