import type { LoadEvent } from '@sveltejs/kit';
import { createQuery_file_Store, fetchQuery_file_Store } from '~/lib/stores/query/query_file_store';
import { createMutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('File');
    return {
        query_file_Store: event.params.id === '_' ?
            createQuery_file_Store(event) :
            await fetchQuery_file_Store(event, { id: { val: event.params.id } }),
        mutation_file_Store: createMutation_file_Store(event)
    };
}