import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const POST: RequestHandler = async ({ cookies, request }) => {
    if (!request.headers.has('Authorization')) {
        request.headers.set('Authorization', cookies.get('Authorization')!)
    }
    try {
        return await fetch(env.PUBLIC_GRAPHQL_URL,
            {
                method: request.method,
                headers: request.headers,
                body: request.body,
                duplex: 'half'
            })
    } catch (error) {
        console.error(error);
        throw error;
    }
};