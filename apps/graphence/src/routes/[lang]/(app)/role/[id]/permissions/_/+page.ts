import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    const node: MutationPermissionArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { 
        id: event.params.id, 
        node, 
        errors,
        mutation_role_permissions_Store: await createMutation_role_permissions_Store(event)
    };
}