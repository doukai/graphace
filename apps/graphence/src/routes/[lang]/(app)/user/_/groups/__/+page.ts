import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import type { MutationGroupArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Group');
    const nodes: MutationGroupArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        query_groupConnection_Store: await fetchQuery_groupConnection_Store(event, { first: 10 }),
        mutation_group_Store: createMutation_group_Store(event)
    };
}