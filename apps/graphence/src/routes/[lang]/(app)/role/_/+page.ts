import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import type { MutationRoleArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Role');
    const node: MutationRoleArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { 
        node, 
        errors,
        mutation_role_Store: createMutation_role_Store(event)
    };
}