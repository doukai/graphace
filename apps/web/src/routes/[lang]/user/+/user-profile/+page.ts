import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type {
    MutationTypeUserArgs,
    MutationTypeUserProfileArgs,
} from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    let parentNode: MutationTypeUserArgs = {};
    let node: MutationTypeUserProfileArgs = {};
    if (event.params.parentNode) {
        parentNode = JSON.parse(event.params.parentNode);
    }
    if (event.params.node) {
        node = JSON.parse(event.params.node);
    }
    return { parentNode, node };
}