import type { LoadEvent } from '@sveltejs/kit';
import { createQuery_permission_Store, fetchQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    return {
        query_permission_Store: event.params.id === '_' ?
            createQuery_permission_Store(event) :
            await fetchQuery_permission_Store(event, { name: { val: event.params.id } }),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}