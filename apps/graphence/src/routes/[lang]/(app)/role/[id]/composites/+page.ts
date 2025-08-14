import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_role_compositesConnection_Store } from '~/lib/stores/query/query_role_compositesConnection_store';
import { createMutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role');
    return {
        query_role_compositesConnection_Store: await fetchQuery_role_compositesConnection_Store(event, { role_id: event.params.id, first: 10 }),
        mutation_role_composites_Store: createMutation_role_composites_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}