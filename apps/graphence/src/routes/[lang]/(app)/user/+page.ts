import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        query_userConnection_Store: await createQuery_userConnection_Store(event, { first: 10 }),
        mutation_user_Store: await createMutation_user_Store(event)
    };
}