import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const rootPathName = `/${locals.locale}`;
    throw redirect(307, rootPathName);
};