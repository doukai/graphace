import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationRoleArgs } from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const nodes: MutationRoleArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return { nodes, errors };
}