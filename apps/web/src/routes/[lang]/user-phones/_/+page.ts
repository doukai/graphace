import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Errors } from '@graphace/commons/types';
import type { MutationTypeUserPhonesArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserPhonesArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { node, errors };
}