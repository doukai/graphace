import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        mutation_role_Store: createMutation_role_Store(event)
    };
}