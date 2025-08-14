import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_group_rolesConnection_Store } from '~/lib/stores/query/query_group_rolesConnection_store';
import { createMutation_group_roles_Store } from '~/lib/stores/mutation/mutation_group_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role');
    return {
        query_group_rolesConnection_Store: await fetchQuery_group_rolesConnection_Store(event, { group_id: event.params.id, first: 10 }),
        mutation_group_roles_Store: createMutation_group_roles_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}