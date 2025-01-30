import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createQuery_role_Store } from '~/lib/stores/query/query_role_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        query_role_Store: await createQuery_role_Store(event, { id: { val: event.params.id } }),
        mutation_role_Store: await createMutation_role_Store(event)
    };
}