import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_role_permissions_Store } from '~/lib/stores/query/query_role_permissions_store';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        id: event.params.id,
        query_role_permissions_Store: await createQuery_role_permissions_Store(event, { role_id: { val: event.params.id, first: 10 } }),
        mutation_role_permissions_Store: await createMutation_role_permissions_Store(event),
        mutation_permission_Store: await createMutation_permission_Store(event)
    };
}