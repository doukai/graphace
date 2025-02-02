import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import type { MutationRoleArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Role');
    const nodes: MutationRoleArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        query_roleConnection_Store: await fetchQuery_roleConnection_Store(event, { first: 10 }),
        mutation_role_Store: createMutation_role_Store(event)
    };
}