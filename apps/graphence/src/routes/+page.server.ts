
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const rootPathName = `/${locals.locale}`;
    throw redirect(307, rootPathName);
};