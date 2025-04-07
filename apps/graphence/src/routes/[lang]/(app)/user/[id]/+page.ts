import type { LoadEvent } from '@sveltejs/kit';
import { createQuery_user_Store, fetchQuery_user_Store } from '~/lib/stores/query/query_user_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User');
    return {
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        query_user_Store: event.params.id === '_' ?
            createQuery_user_Store(event) :
            await fetchQuery_user_Store(event, { id: { val: event.params.id } }),
        mutation_user_Store: createMutation_user_Store(event)
    };
}