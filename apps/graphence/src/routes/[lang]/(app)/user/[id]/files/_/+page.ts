import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_user_files_Store } from '~/lib/stores/mutation/mutation_user_files_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('File');
    return {
        id: event.params.id,
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        mutation_user_files_Store: createMutation_user_files_Store(event)
    };
}