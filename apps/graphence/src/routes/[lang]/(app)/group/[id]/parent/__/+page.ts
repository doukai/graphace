import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
import { createMutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    const notBelongToParent = { not: true, parent: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        query_groupConnection_Store: await fetchQuery_groupConnection_Store(event, { first: 10, exs: [notBelongToParent] }),
        mutation_group_parent_Store: createMutation_group_parent_Store(event),
        mutation_group_Store: createMutation_group_Store(event)
    };
}