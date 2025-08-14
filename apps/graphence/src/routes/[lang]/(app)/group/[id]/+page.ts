import type { LoadEvent } from '@sveltejs/kit';
import { createQuery_group_Store, fetchQuery_group_Store } from '~/lib/stores/query/query_group_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Group');
    return {
        query_group_Store: event.params.id === '_' ?
            createQuery_group_Store(event) :
            await fetchQuery_group_Store(event, { id: { val: event.params.id } }),
        mutation_group_Store: createMutation_group_Store(event)
    };
}