import { redirect } from '@sveltejs/kit';
import { fetchQuery_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
import { createMutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_group_parent_Store: await fetchQuery_group_parent_Store(event, { group_id: event.params.id }),
			mutation_group_parent_Store: createMutation_group_parent_Store(event),
			mutation_group_Store: createMutation_group_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/group/_`);
}