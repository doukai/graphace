import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_group_subGroupsConnection_Store } from '~/lib/stores/query/query_group_subGroupsConnection_store';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        query_group_subGroupsConnection_Store: await fetchQuery_group_subGroupsConnection_Store(event, { group_id: event.params.id, first: 10 }),
        mutation_group_subGroups_Store: createMutation_group_subGroups_Store(event),
        mutation_group_Store: createMutation_group_Store(event)
    };
}