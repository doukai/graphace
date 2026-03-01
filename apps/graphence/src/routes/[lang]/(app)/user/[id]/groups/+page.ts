import { redirect } from '@sveltejs/kit';
import { fetchQuery_user_groupsConnection_Store } from '~/lib/stores/query/query_user_groupsConnection_store';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_user_groupsConnection_Store: await fetchQuery_user_groupsConnection_Store(event, { user_id: event.params.id, first: 10 }),
			mutation_user_groups_Store: createMutation_user_groups_Store(event),
			mutation_group_Store: createMutation_group_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/user/_`);
}