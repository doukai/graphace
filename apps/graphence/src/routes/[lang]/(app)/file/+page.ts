import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_fileConnection_Store } from '~/lib/stores/query/query_fileConnection_store';
import { createMutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('File');
    return {
        query_fileConnection_Store: await fetchQuery_fileConnection_Store(event, { first: 10 }),
        mutation_file_Store: createMutation_file_Store(event)
    };
}