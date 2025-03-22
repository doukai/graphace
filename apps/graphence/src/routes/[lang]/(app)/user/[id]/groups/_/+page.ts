import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        id: event.params.id,
        mutation_user_groups_Store: createMutation_user_groups_Store(event)
    };
}