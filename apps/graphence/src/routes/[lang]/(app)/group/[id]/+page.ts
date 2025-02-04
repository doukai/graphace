import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_group_Store } from '~/lib/stores/query/query_group_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        query_group_Store: await fetchQuery_group_Store(event, { id: { val: event.params.id } }),
        mutation_group_Store: createMutation_group_Store(event)
    };
}