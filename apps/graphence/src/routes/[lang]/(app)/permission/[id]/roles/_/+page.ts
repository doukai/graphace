import { redirect } from '@sveltejs/kit';
import { createMutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Role');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			mutation_permission_roles_Store: createMutation_permission_roles_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/permission/_`);
}