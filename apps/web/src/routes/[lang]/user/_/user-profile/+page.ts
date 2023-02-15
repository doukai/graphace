import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Error } from '@graphace/commons/types';
import type { MutationTypeUserProfileArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserProfileArgs = getNode(event.url) || {};
	const errors: Record<string, Error> = getErrors(event.url) || {};
    return { node, errors };
}