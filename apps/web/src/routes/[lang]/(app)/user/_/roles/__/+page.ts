import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Errors } from '@graphace/commons/types';
import type { MutationTypeRoleArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '@graphace/commons/utils/url-util';
import { load_Query_roleConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const nodes: MutationTypeRoleArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return {
        nodes,
        errors,
        ...(await load_Query_roleConnection({ event, variables: { first: 10 } }))
    };
}