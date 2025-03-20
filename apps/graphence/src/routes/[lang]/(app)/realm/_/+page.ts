import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Realm');
    return {
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}