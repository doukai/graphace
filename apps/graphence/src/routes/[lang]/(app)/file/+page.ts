import { fetchQuery_fileConnection_Store } from '~/lib/stores/query/query_fileConnection_store';
import { createMutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('File');
	return {
		query_fileConnection_Store: await fetchQuery_fileConnection_Store(event, { first: 10 }),
		mutation_file_Store: createMutation_file_Store(event)
	};
}