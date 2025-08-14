import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_role_groups_Store } from '~/lib/stores/mutation/mutation_role_groups_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Group');
    return {
        id: event.params.id,
        mutation_role_groups_Store: createMutation_role_groups_Store(event)
    };
}