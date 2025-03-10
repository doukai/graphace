import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
import { createMutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    const notBelongToParent = { not: true, permissions: { name: { val: event.params.id } } };
    return {
        id: event.params.name,
        notBelongToParent,
        query_roleConnection_Store: await fetchQuery_roleConnection_Store(event, { first: 10, exs: [notBelongToParent] }),
        mutation_permission_roles_Store: createMutation_permission_roles_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}