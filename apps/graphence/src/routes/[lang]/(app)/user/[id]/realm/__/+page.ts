import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
import { createMutation_user_realm_Store } from '~/lib/stores/mutation/mutation_user_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Realm');
    return {
        id: event.params.id,
        query_realmConnection_Store: await fetchQuery_realmConnection_Store(event, { first: 10 }),
        mutation_user_realm_Store: createMutation_user_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}