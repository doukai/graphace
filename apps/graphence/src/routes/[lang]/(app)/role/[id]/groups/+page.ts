import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_role_groups_Store } from '~/lib/stores/query/query_role_groups_store';
import { createMutation_role_groups_Store } from '~/lib/stores/mutation/mutation_role_groups_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    return {
        id: event.params.id,
        query_role_groups_Store: await createQuery_role_groups_Store(event, { role_id: { val: event.params.id, first: 10 } }),
        mutation_role_groups_Store: await createMutation_role_groups_Store(event),
        mutation_group_Store: await createMutation_group_Store(event)
    };
}