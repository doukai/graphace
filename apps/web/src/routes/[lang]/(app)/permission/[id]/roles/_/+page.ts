import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Errors } from '@graphace/commons/types';
import type { MutationRoleArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '@graphace/commons/utils/url-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationRoleArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { name: event.params.id, node, errors };
}