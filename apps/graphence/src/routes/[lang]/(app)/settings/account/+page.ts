import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_currentUser_Store } from '~/lib/stores/query/query_currentUser_store';
import { createMutation_currentUserUpdate_Store } from '~/lib/stores/mutation/mutation_currentUserUpdate_store';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        query_currentUser_Store: await createQuery_currentUser_Store(event),
        mutation_currentUserUpdate_Store: await createMutation_currentUserUpdate_Store(event),
    };
}