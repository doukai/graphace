import { createQuery_role_Store, fetchQuery_role_Store } from '~/lib/stores/query/query_role_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Role');
	return {
		query_role_Store: event.params.id === '_' ?
			createQuery_role_Store(event) :
			await fetchQuery_role_Store(event, { id: { val: event.params.id } }),
		mutation_role_Store: createMutation_role_Store(event)
	};
}