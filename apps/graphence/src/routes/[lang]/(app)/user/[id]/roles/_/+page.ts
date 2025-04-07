import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        id: event.params.id,
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        mutation_user_roles_Store: createMutation_user_roles_Store(event)
    };
}