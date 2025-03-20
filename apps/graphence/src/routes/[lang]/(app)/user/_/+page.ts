import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User');
    return {
        mutation_user_Store: createMutation_user_Store(event)
    };
}