import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    return {
        query_permission_Store: await fetchQuery_permission_Store(event, { name: { val: event.params.id } }),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}