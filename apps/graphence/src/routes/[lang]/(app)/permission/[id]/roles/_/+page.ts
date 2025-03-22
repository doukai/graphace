import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        name: event.params.id,
        mutation_permission_roles_Store: createMutation_permission_roles_Store(event)
    };
}