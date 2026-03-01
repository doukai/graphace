import { createQuery_user_Store, fetchQuery_user_Store } from '~/lib/stores/query/query_user_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('User');
	return {
		query_user_Store: event.params.id === '_' ?
			createQuery_user_Store(event) :
			await fetchQuery_user_Store(event, { id: { val: event.params.id } }),
		mutation_user_Store: createMutation_user_Store(event)
	};
}