import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.name,
        ...(await load_Query_roleConnection({ event, variables: { first: 10 } }))
    };
}