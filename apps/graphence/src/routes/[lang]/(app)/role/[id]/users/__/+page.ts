import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { fetchQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
import { createMutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User');
    const notBelongToParent = { not: true, roles: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        query_userConnection_Store: await fetchQuery_userConnection_Store(event, { first: 10, exs: [notBelongToParent] }),
        mutation_role_users_Store: createMutation_role_users_Store(event),
        mutation_user_Store: createMutation_user_Store(event)
    };
}