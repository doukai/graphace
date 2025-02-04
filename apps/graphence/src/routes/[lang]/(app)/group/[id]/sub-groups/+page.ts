import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_group_subGroups_Store } from '~/lib/stores/query/query_group_subGroups_store';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        id: event.params.id,
        query_group_subGroups_Store: await fetchQuery_group_subGroups_Store(event, { group_id: { val: event.params.id, first: 10 } }),
        mutation_group_subGroups_Store: createMutation_group_subGroups_Store(event),
        mutation_group_Store: createMutation_group_Store(event)
    };
}