import type { LoadEvent } from '@sveltejs/kit';
import { load_QueryUserConnection } from '$houdini';
import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types';

export const load: LayoutLoad = async (event: LoadEvent) => {

    return {
        ...(await load_QueryUserConnection({ event }))
    };
}