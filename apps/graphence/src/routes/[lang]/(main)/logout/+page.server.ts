
import type { PageServerLoad } from './$types';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const { cookies, locals } = event;
    cookies.delete('Authorization', { path: '/' });

    const loginPathName = `/${locals.locale}/login`;
    throw redirect(307, loginPathName);
};