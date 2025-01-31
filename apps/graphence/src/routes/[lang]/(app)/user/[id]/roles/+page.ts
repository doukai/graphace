import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_user_roles_Store } from '~/lib/stores/query/query_user_roles_store';
import { createMutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        id: event.params.id,
        query_user_roles_Store: await createQuery_user_roles_Store(event, { user_id: { val: event.params.id, first: 10 } }),
        mutation_user_roles_Store: await createMutation_user_roles_Store(event),
        mutation_role_Store: await createMutation_role_Store(event)
    };
}