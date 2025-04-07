import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_user_filesConnection_Store } from '~/lib/stores/query/query_user_filesConnection_store';
import { createMutation_user_files_Store } from '~/lib/stores/mutation/mutation_user_files_store';
import { createMutation_file_Store } from '~/lib/stores/mutation/mutation_file_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('File');
    return {
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        query_user_filesConnection_Store: await fetchQuery_user_filesConnection_Store(event, { user_id: event.params.id, first: 10 }),
        mutation_user_files_Store: createMutation_user_files_Store(event),
        mutation_file_Store: createMutation_file_Store(event)
    };
}