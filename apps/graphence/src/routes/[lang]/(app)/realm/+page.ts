import { fetchQuery_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Realm');
	return {
		query_realmConnection_Store: await fetchQuery_realmConnection_Store(event, { first: 10 }),
		mutation_realm_Store: createMutation_realm_Store(event)
	};
}