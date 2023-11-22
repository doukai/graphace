import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { load_Query_user_realm } from '$houdini';
import type { MutationRealmArgs } from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    const node: MutationRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_user_realm({ event, variables: { user_id: { val: event.params.id } } }))
    };
}