import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User');
    return {
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        query_userConnection_Store: await fetchQuery_userConnection_Store(event, { first: 10 }),
        mutation_user_Store: createMutation_user_Store(event)
    };
}