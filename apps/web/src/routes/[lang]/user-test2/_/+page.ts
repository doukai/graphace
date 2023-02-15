import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Error } from '@graphace/commons/types';
import type { MutationTypeUserTest2Args } from '~/lib/types/schema';
import { getNode, getErrors } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserTest2Args = getNode(event.url) || {};
	const errors: Record<string, Error> = getErrors(event.url) || {};
    return { node, errors };
}