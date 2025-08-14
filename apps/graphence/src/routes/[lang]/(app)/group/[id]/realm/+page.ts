import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_group_realm_Store } from '~/lib/stores/query/query_group_realm_store';
import { createMutation_group_realm_Store } from '~/lib/stores/mutation/mutation_group_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Realm');
    return {
        query_group_realm_Store: await fetchQuery_group_realm_Store(event, { group_id: event.params.id }),
        mutation_group_realm_Store: createMutation_group_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}