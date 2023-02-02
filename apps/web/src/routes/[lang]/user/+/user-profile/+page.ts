import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type {
    MutationTypeUserProfileArgs,
} from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    let node: MutationTypeUserProfileArgs = {}
    let path: (string | number)[] = [];
    if (event.url.searchParams.has('root')) {
        let node = JSON.parse(event.url.searchParams.get('root') || '{}');
        if (event.url.searchParams.has('path')) {
            path = JSON.parse(event.url.searchParams.get('path') || '[]');
            path.forEach((value) => {
                node = node[value];
            });
        }
    }
    return { node, path };
}