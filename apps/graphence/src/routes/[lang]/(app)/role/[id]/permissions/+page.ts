import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_role_permissions_Store } from '~/lib/stores/query/query_role_permissions_store';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Permission');
    return {
        id: event.params.id,
        query_role_permissions_Store: await fetchQuery_role_permissions_Store(event, { role_id: { val: event.params.id, first: 10 } }),
        mutation_role_permissions_Store: createMutation_role_permissions_Store(event),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}