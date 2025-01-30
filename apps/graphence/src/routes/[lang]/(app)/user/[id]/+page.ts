import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_user_Store } from '~/lib/stores/query/query_user_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        query_user_Store: await createQuery_user_Store(event, { id: { val: event.params.id } }),
        mutation_user_Store: await createMutation_user_Store(event)
    };
}