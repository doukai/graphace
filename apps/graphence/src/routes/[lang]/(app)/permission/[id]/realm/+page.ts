import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { fetchQuery_permission_realm_Store } from '~/lib/stores/query/query_permission_realm_store';
import { createMutation_permission_realm_Store } from '~/lib/stores/mutation/mutation_permission_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import type { MutationRealmArgs } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore().getTypes('Realm');
    const node: MutationRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        query_permission_realm_Store: await fetchQuery_permission_realm_Store(event, { permission_name: { val: event.params.id } }),
        mutation_permission_realm_Store: createMutation_permission_realm_Store(event),
        mutation_realm_Store: createMutation_realm_Store(event)
    };
}