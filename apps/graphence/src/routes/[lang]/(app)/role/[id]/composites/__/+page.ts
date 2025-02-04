import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
import { createMutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    const notBelongToParent = { not: true, composites: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        query_roleConnection_Store: await fetchQuery_roleConnection_Store(event, { first: 10, exs: [notBelongToParent] }),
        mutation_role_composites_Store: createMutation_role_composites_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}