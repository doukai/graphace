import { redirect } from '@sveltejs/kit';
import { fetchQuery_role_groupsConnection_Store } from '~/lib/stores/query/query_role_groupsConnection_store';
import { createMutation_role_groups_Store } from '~/lib/stores/mutation/mutation_role_groups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_role_groupsConnection_Store: await fetchQuery_role_groupsConnection_Store(event, { role_id: event.params.id, first: 10 }),
			mutation_role_groups_Store: createMutation_role_groups_Store(event),
			mutation_group_Store: createMutation_group_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/role/_`);
}