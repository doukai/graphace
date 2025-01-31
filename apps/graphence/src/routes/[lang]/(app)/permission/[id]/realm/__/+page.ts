import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
import { createMutation_permission_realm_Store } from '~/lib/stores/mutation/mutation_permission_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    return {
        id: event.params.name,
        query_realmConnection_Store: await createQuery_realmConnection_Store(event, { first: 10 }),
        mutation_permission_realm_Store: await createMutation_permission_realm_Store(event),
        mutation_realm_Store: await createMutation_realm_Store(event)
    };
}