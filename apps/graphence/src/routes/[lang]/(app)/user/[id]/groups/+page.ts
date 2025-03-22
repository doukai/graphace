import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_user_groups_Store } from '~/lib/stores/query/query_user_groups_store';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        query_user_groups_Store: await fetchQuery_user_groups_Store(event, { user_id: event.params.id, first: 10 }),
        mutation_user_groups_Store: createMutation_user_groups_Store(event),
        mutation_group_Store: createMutation_group_Store(event)
    };
}