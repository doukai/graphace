
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const { cookies, locals } = event;
    cookies.delete('Authorization', { path: '/' });

    const loginPathName = `/${locals.locale}/login`;
    redirect(307, loginPathName);
};