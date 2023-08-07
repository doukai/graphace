import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_apiConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.id,
        ...(await load_Query_apiConnection({ event, variables: { first: 10 } }))
    };
}