import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Permission');
    return {
        query_permissionConnection_Store: await fetchQuery_permissionConnection_Store(event, { first: 10 }),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}