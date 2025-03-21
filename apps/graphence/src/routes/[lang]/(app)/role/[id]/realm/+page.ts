import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_role_realm_Store } from '~/lib/stores/query/query_role_realm_store';
import { createMutation_role_realm_Store } from '~/lib/stores/mutation/mutation_role_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Realm');
    return {
        query_role_realm_Store: await fetchQuery_role_realm_Store(event, { role_id: event.params.id }),
        mutation_role_realm_Store: createMutation_role_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}