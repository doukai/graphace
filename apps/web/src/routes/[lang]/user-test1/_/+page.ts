import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Error } from '@graphace/commons/types';
import type { MutationTypeUserTest1Args } from '~/lib/types/schema';
import { getNode, getErrors } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserTest1Args = getNode(event.url) || {};
	const errors: Record<string, Error> = getErrors(event.url) || {};
    return { node, errors };
}