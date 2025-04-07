import type { LoadEvent } from '@sveltejs/kit';
import { fetchQuery_user_rolesConnection_Store } from '~/lib/stores/query/query_user_rolesConnection_store';
import { createMutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { createMutation_singleUpload_Store } from '~/lib/stores/mutation/mutation_singleUpload_store';
import { getPermissionsStore } from '~/utils';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Role');
    return {
        mutation_singleUpload_Store: createMutation_singleUpload_Store(event),
        query_user_rolesConnection_Store: await fetchQuery_user_rolesConnection_Store(event, { user_id: event.params.id, first: 10 }),
        mutation_user_roles_Store: createMutation_user_roles_Store(event),
        mutation_role_Store: createMutation_role_Store(event)
    };
}