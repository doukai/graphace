import type { LoadEvent } from '@sveltejs/kit';
import { createMutation_currentUserResetPassword_Store } from '~/lib/stores/mutation/mutation_currentUserResetPassword_store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        mutation_currentUserResetPassword_Store: createMutation_currentUserResetPassword_Store(event)
    };
}