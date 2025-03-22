import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Group');
    return {
        id: event.params.id,
        mutation_group_subGroups_Store: createMutation_group_subGroups_Store(event)
    };
}