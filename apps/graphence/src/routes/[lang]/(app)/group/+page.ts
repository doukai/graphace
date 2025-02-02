import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Group');
    return {
        query_groupConnection_Store: await fetchQuery_groupConnection_Store(event, { first: 10 }),
        mutation_group_Store: createMutation_group_Store(event)
    };
}