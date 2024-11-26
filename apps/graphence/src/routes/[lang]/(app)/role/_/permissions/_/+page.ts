import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    const node: MutationPermissionArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { node, errors };
}