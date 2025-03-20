import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        mutation_group_Store: createMutation_group_Store(event)
    };
}