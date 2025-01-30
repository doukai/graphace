import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        query_roleConnection_Store: await createQuery_roleConnection_Store(event, { first: 10 }),
        mutation_role_Store: await createMutation_role_Store(event)
    };
}