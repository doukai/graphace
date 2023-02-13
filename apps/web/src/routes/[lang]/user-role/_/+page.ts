import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeUserRoleArgs } from '~/lib/types/schema';
import { getNode } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserRoleArgs = getNode(event.url);
    return { node };
}