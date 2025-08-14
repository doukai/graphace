import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_permission_rolesConnection_Store } from '~/lib/stores/query/query_permission_rolesConnection_store';
import { createMutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role');
    return {
        query_permission_rolesConnection_Store: await fetchQuery_permission_rolesConnection_Store(event, { permission_id: event.params.id, first: 10 }),
        mutation_permission_roles_Store: createMutation_permission_roles_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}