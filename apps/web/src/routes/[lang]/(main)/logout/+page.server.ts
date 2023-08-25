
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    cookies.delete('Authorization', { path: '/' });

    const loginPathName = `/${locals.locale}/login`;
    throw redirect(307, loginPathName);
};