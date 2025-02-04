import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    const nodes: MutationPermissionArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        query_permissionConnection_Store: await fetchQuery_permissionConnection_Store(event, { first: 10 }),
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}