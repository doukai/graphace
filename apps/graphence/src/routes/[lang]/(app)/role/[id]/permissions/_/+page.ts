import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    return {
        id: event.params.id,
        mutation_role_permissions_Store: createMutation_role_permissions_Store(event)
    };
}