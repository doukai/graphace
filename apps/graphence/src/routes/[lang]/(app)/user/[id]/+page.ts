import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_user_Store } from '~/lib/stores/query/query_user_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('User');
    return {
        query_user_Store: await fetchQuery_user_Store(event, { id: { val: event.params.id } }),
        mutation_user_Store: createMutation_user_Store(event)
    };
}