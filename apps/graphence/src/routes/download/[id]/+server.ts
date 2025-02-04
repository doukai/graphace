import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = async ({ cookies, request, params }) => {
    if (!request.headers.has('Authorization')) {
        request.headers.set('Authorization', cookies.get('Authorization')!)
    }
    try {
        return await fetch(`${env.PUBLIC_DOWNLOAD_URL}/${params.id}`,
            {
                // propagate the request method and body
                method: request.method,
                headers: request.headers,
                body: request.body,
                duplex: 'half'
            });
    } catch (error) {
        console.error(error);
        throw error;
    }
};