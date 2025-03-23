import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_role_permissionsConnection_Store } from '~/lib/stores/query/query_role_permissionsConnection_store';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    return {
        query_role_permissionsConnection_Store: await fetchQuery_role_permissionsConnection_Store(event, { role_id: event.params.id, first: 10 }),
        mutation_role_permissions_Store: createMutation_role_permissions_Store(event),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}