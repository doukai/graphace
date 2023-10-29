import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import { load_Query_permissionConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const nodes: MutationPermissionArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        ...(await load_Query_permissionConnection({ event, variables: { first: 10 } }))
    };
}