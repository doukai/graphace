import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import type { MutationUserArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('User');
    const nodes: MutationUserArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        query_userConnection_Store: await fetchQuery_userConnection_Store(event, { first: 10 }),
        mutation_user_Store: createMutation_user_Store(event)
    };
}