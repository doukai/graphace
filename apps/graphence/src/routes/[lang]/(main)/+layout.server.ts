import type { ServerLoadEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event: ServerLoadEvent) => {
	const { locals: { locale, jwt } } = event;
	return { locale, jwt };
}