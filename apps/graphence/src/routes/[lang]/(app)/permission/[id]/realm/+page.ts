import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_permission_realm_Store } from '~/lib/stores/query/query_permission_realm_store';
import { createMutation_permission_realm_Store } from '~/lib/stores/mutation/mutation_permission_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Realm');
    return {
        query_permission_realm_Store: await fetchQuery_permission_realm_Store(event, { permission_name: event.params.id }),
        mutation_permission_realm_Store: createMutation_permission_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}