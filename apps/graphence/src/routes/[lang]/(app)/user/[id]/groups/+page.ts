import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_user_groups_Store } from '~/lib/stores/query/query_user_groups_store';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    return {
        id: event.params.id,
        query_user_groups_Store: await createQuery_user_groups_Store(event, { user_id: { val: event.params.id, first: 10 } }),
        mutation_user_groups_Store: await createMutation_user_groups_Store(event),
        mutation_group_Store: await createMutation_group_Store(event)
    };
}