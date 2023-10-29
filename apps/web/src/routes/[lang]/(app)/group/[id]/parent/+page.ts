import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { load_Query_group_parent } from '$houdini';
import type { MutationGroupArgs } from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationGroupArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_group_parent({ event, variables: { group_id: { val: event.params.id } } }))
    };
}