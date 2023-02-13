import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeUserArgs } from '~/lib/types/schema';
import { getNode } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserArgs = getNode(event.url);
    return { id: event.params.id, node };
}