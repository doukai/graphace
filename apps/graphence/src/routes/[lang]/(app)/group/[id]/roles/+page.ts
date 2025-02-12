import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_group_roles_Store } from '~/lib/stores/query/query_group_roles_store';
import { createMutation_group_roles_Store } from '~/lib/stores/mutation/mutation_group_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        id: event.params.id,
        query_group_roles_Store: await fetchQuery_group_roles_Store(event, { group_id: { val: event.params.id, first: 10 } }),
        mutation_group_roles_Store: createMutation_group_roles_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}