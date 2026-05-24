import { createQuery_file_Store, fetchQuery_file_Store } from '~/lib/stores/query/query_file_store';
import { createMutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('File');
	return {
		query_file_Store: event.params.id === '_' ?
			createQuery_file_Store(event) :
			await fetchQuery_file_Store(event, { id: { val: event.params.id } }),
		mutation_file_Store: createMutation_file_Store(event)
	};
}