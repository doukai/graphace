import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { Errors } from '@graphace/commons/types';
import type { MutationTypeRealmArgs } from '~/lib/types/schema';
import { getNode, getErrors } from '@graphace/commons/utils/url-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeRealmArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { : event.params.id, node, errors };
}