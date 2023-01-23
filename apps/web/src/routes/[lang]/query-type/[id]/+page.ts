import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types';
import { load_QueryQueryType } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_QueryQueryType({ event, variables: { id: { val: event.params.id } } }))
    };
}