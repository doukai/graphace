import { fetchQuery_currentUser_Store } from '~/lib/stores/query/query_currentUser_store';
import { createMutation_currentUserUpdate_Store } from '~/lib/stores/mutation/mutation_currentUserUpdate_store';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
    return {
        query_currentUser_Store: await fetchQuery_currentUser_Store(event),
        mutation_currentUserUpdate_Store: createMutation_currentUserUpdate_Store(event),
    };
}