import { fetchQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('User');
	return {
		query_userConnection_Store: await fetchQuery_userConnection_Store(event, { first: 10 }),
		mutation_user_Store: createMutation_user_Store(event)
	};
}