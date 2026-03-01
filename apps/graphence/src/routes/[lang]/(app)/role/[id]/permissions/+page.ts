import { redirect } from '@sveltejs/kit';
import { fetchQuery_role_permissionsConnection_Store } from '~/lib/stores/query/query_role_permissionsConnection_store';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Permission');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_role_permissionsConnection_Store: await fetchQuery_role_permissionsConnection_Store(event, { role_id: event.params.id, first: 10 }),
			mutation_role_permissions_Store: createMutation_role_permissions_Store(event),
			mutation_permission_Store: createMutation_permission_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/role/_`);
}