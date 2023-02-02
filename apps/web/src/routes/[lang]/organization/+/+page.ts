import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import type { MutationTypeOrganizationArgs } from '~/lib/types/schema';

export const load: LayoutLoad = async (event: LoadEvent) => {
    let node: MutationTypeOrganizationArgs = {};
    if (event.url.searchParams.has('node')) {
        node = JSON.parse(event.url.searchParams.get('node') || '');
    }
    return { node };
}