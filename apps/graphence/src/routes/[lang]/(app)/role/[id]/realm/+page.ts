import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_role_realm_Store } from '~/lib/stores/query/query_role_realm_store';
import { createMutation_role_realm_Store } from '~/lib/stores/mutation/mutation_role_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import type { MutationRealmArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('Realm');
    const node: MutationRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        query_role_realm_Store: await fetchQuery_role_realm_Store(event, { role_id: { val: event.params.id } }),
        mutation_role_realm_Store: createMutation_role_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}