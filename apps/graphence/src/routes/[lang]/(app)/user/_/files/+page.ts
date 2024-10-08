import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationFileArgs } from '~/lib/types/schema';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('File');
    const nodes: MutationFileArgs[] = getNode(event.url) || [];
	const errors: Record<number, Errors> = getErrors(event.url) || {};
    return { nodes, errors };
}