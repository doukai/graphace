import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        code: event.params.code
    };
}