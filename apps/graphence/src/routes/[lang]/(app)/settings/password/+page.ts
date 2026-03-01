import { createMutation_currentUserResetPassword_Store } from '~/lib/stores/mutation/mutation_currentUserResetPassword_store';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
    return {
        mutation_currentUserResetPassword_Store: createMutation_currentUserResetPassword_Store(event)
    };
}