import { redirect } from '@sveltejs/kit';
import { fetchQuery_group_subGroupsConnection_Store } from '~/lib/stores/query/query_group_subGroupsConnection_store';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_group_subGroupsConnection_Store: await fetchQuery_group_subGroupsConnection_Store(event, { group_id: event.params.id, first: 10 }),
			mutation_group_subGroups_Store: createMutation_group_subGroups_Store(event),
			mutation_group_Store: createMutation_group_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/group/_`);
}