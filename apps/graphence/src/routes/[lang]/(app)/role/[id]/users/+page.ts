import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_role_users_Store } from '~/lib/stores/query/query_role_users_store';
import { createMutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        id: event.params.id,
        query_role_users_Store: await createQuery_role_users_Store(event, { role_id: { val: event.params.id, first: 10 } }),
        mutation_role_users_Store: await createMutation_role_users_Store(event),
        mutation_user_Store: await createMutation_user_Store(event)
    };
}