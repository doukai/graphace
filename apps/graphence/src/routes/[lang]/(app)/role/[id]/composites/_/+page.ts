import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
import { permissions } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role');
    return {
        id: event.params.id,
        mutation_role_composites_Store: createMutation_role_composites_Store(event)
    };
}