import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import type { MutationRoleArgs } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    const node: MutationRoleArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return { name: event.params.id, node, errors };
}