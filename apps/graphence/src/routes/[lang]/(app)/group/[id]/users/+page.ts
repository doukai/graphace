import { redirect } from '@sveltejs/kit';
import { fetchQuery_group_usersConnection_Store } from '~/lib/stores/query/query_group_usersConnection_store';
import { createMutation_group_users_Store } from '~/lib/stores/mutation/mutation_group_users_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('User');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_group_usersConnection_Store: await fetchQuery_group_usersConnection_Store(event, { group_id: event.params.id, first: 10 }),
			mutation_group_users_Store: createMutation_group_users_Store(event),
			mutation_user_Store: createMutation_user_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/group/_`);
}