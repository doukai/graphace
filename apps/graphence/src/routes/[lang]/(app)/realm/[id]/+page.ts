import type { LoadEvent } from '@sveltejs/kit';
import { createQuery_realm_Store, fetchQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Realm');
    return {
        query_realm_Store: event.params.id === '_' ?
            createQuery_realm_Store(event) :
            await fetchQuery_realm_Store(event, { id: { val: event.params.id } }),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}