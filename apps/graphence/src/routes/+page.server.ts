import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const { locals } = event;
    const rootPathName = `/${locals.locale}`;
    redirect(307, rootPathName);
};