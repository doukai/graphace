import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeRoleArgs } from '~/lib/types/schema';
import { getNode } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeRoleArgs = getNode(event.url);
    return { id: event.params.id, node };
}