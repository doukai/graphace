import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Permission');
    return {
        mutation_permission_Store: createMutation_permission_Store(event)
    };
}