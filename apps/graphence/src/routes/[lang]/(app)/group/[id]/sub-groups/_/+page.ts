import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
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
        mutation_group_subGroups_Store: await createMutation_group_subGroups_Store(event)
    };
}