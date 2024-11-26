import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationPermissionArgs } from '~/';
import { load_Query_permissionConnection } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    const nodes: MutationPermissionArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        ...(await load_Query_permissionConnection({ event, variables: { first: 10 } }))
    };
}