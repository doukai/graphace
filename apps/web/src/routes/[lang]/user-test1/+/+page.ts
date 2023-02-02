import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeUserTest1Args } from '~/lib/types/schema';
import { getNode } from '~/lib/utils'

export const load: LayoutLoad = async (event: LoadEvent) => {
    const node: MutationTypeUserTest1Args = getNode(event.url);
    return { node };
}