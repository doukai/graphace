import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationRealmArgs } from '~/lib/types/schema';
import { load_Query_realmConnection } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    const node: MutationRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_realmConnection({ event, variables: { first: 10 } }))
    };
}