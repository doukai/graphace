import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Errors } from '@graphace/commons/types';
import { load_Query_userRole_from } from '$houdini';
import type { MutationTypeUserArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '@graphace/commons/utils/url-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_userRole_from({ event, variables: { userRole_id: { val: event.params.id } } }))
    };
}