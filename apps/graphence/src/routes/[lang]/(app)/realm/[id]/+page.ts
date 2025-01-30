import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    return {
        query_realm_Store: await createQuery_realm_Store(event, { id: { val: event.params.id } }),
        mutation_realm_Store: await createMutation_realm_Store(event)
    };
}