import { fetchQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Role');
	return {
		query_roleConnection_Store: await fetchQuery_roleConnection_Store(event, { first: 10 }),
		mutation_role_Store: createMutation_role_Store(event)
	};
}