import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { load_Query_group_realm } from '$houdini';
import type { MutationRealmArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    const node: MutationRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_group_realm({ event, variables: { group_id: { val: event.params.id } } }))
    };
}