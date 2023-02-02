import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
import { getNode } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeRoleRoleTypeArgs = getNode(event.url);
    return { node };
}