import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type {
    MutationTypeUserProfileArgs,
    MutationTypeUserArgs,
} from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    let parentNode: MutationTypeUserProfileArgs = {};
    let node: MutationTypeUserArgs = {};
    if (event.url.searchParams.has('parentNode')) {
        parentNode = JSON.parse(event.url.searchParams.get('parentNode') || '');
    }
    if (event.url.searchParams.has('node')) {
        node = JSON.parse(event.url.searchParams.get('node') || '');
    }
    return { parentNode, node };
}