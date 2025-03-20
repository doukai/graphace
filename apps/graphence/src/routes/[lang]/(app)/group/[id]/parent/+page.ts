import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
import { createMutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        query_group_parent_Store: await fetchQuery_group_parent_Store(event, { group_: event.params.id }),
        mutation_group_parent_Store: createMutation_group_parent_Store(event),
        mutation_group_Store: createMutation_group_Store(event)
    };
}