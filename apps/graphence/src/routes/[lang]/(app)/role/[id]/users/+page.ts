import { redirect } from '@sveltejs/kit';
import { fetchQuery_role_usersConnection_Store } from '~/lib/stores/query/query_role_usersConnection_store';
import { createMutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('User');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_role_usersConnection_Store: await fetchQuery_role_usersConnection_Store(event, { role_id: event.params.id, first: 10 }),
			mutation_role_users_Store: createMutation_role_users_Store(event),
			mutation_user_Store: createMutation_user_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/role/_`);
}