import { createQuery_permission_Store, fetchQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Permission');
	return {
		query_permission_Store: event.params.id === '_' ?
			createQuery_permission_Store(event) :
			await fetchQuery_permission_Store(event, { id: { val: event.params.id } }),
		mutation_permission_Store: createMutation_permission_Store(event)
	};
}