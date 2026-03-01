import { redirect } from '@sveltejs/kit';
import { createMutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('User');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			mutation_role_users_Store: createMutation_role_users_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/role/_`);
}