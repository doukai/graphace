import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        query_permissionConnection_Store: await createQuery_permissionConnection_Store(event, { first: 10 }),
        mutation_permission_Store: await createMutation_permission_Store(event)
    };
}