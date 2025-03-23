import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_group_usersConnection_Store } from '~/lib/stores/query/query_group_usersConnection_store';
import { createMutation_group_users_Store } from '~/lib/stores/mutation/mutation_group_users_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User');
    return {
        query_group_usersConnection_Store: await fetchQuery_group_usersConnection_Store(event, { group_id: event.params.id, first: 10 }),
        mutation_group_users_Store: createMutation_group_users_Store(event),
        mutation_user_Store: createMutation_user_Store(event)
    };
}