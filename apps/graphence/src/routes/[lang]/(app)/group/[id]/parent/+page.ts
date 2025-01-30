import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { createQuery_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
import { createMutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import type { MutationGroupArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    const node: MutationGroupArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        query_group_parent_Store: await createQuery_group_parent_Store( event, { group_id: { val: event.params.id } } ),
        mutation_group_parent_Store: await createMutation_group_parent_Store(event),
        mutation_group_Store: await createMutation_group_Store(event)
    };
}