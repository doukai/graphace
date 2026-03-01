import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
    const { cookies, locals } = event;
    cookies.delete('Authorization', { path: '/' });

    const loginPathName = `/${locals.locale}/login`;
    redirect(307, loginPathName);
};