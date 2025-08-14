import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_group_roles_Store } from '~/lib/stores/mutation/mutation_group_roles_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role');
    return {
        id: event.params.id,
        mutation_group_roles_Store: createMutation_group_roles_Store(event)
    };
}