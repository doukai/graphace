import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Permission');
    const notBelongToParent = { not: true, roles: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        query_permissionConnection_Store: await fetchQuery_permissionConnection_Store(event, { first: 10, exs: [notBelongToParent] }),
        mutation_role_permissions_Store: createMutation_role_permissions_Store(event),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}