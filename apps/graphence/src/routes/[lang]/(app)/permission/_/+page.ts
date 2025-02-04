import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    const node: MutationPermissionArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { 
        node, 
        errors,
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}