import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_role_Store } from '~/lib/stores/query/query_role_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        query_role_Store: await fetchQuery_role_Store(event, { id: { val: event.params.id } }),
        mutation_role_Store: createMutation_role_Store(event)
    };
}