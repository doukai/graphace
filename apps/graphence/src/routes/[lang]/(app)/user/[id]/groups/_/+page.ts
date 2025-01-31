import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import type { MutationGroupArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    const node: MutationGroupArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { 
        id: event.params.id, 
        node, 
        errors,
        mutation_user_groups_Store: await createMutation_user_groups_Store(event)
    };
}