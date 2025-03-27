import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_currentUser_Store } from '~/lib/stores/query/query_currentUser_store';
import { createMutation_currentUserUpdate_Store } from '~/lib/stores/mutation/mutation_currentUserUpdate_store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        query_currentUser_Store: await fetchQuery_currentUser_Store(event),
        mutation_currentUserUpdate_Store: createMutation_currentUserUpdate_Store(event),
    };
}