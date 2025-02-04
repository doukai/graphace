import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_role_composites_Store } from '~/lib/stores/query/query_role_composites_store';
import { createMutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        id: event.params.id,
        query_role_composites_Store: await fetchQuery_role_composites_Store(event, { role_id: { val: event.params.id, first: 10 } }),
        mutation_role_composites_Store: createMutation_role_composites_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}