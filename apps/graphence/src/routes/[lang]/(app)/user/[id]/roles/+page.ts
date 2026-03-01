import { redirect } from '@sveltejs/kit';
import { fetchQuery_user_rolesConnection_Store } from '~/lib/stores/query/query_user_rolesConnection_store';
import { createMutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Role');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_user_rolesConnection_Store: await fetchQuery_user_rolesConnection_Store(event, { user_id: event.params.id, first: 10 }),
			mutation_user_roles_Store: createMutation_user_roles_Store(event),
			mutation_role_Store: createMutation_role_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/user/_`);
}