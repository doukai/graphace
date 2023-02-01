import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type {
    MutationTypeUserProfileArgs,
    MutationTypeUserArgs,
} from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    let parentNode: MutationTypeUserProfileArgs = {};
    let node: MutationTypeUserArgs = {};
    if (event.params.parentNode) {
        parentNode = JSON.parse(event.params.parentNode);
    }
    if (event.params.node) {
        node = JSON.parse(event.params.node);
    }
    return { parentNode, node };
}