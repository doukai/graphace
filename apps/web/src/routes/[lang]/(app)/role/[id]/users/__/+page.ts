import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_userConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.id,
        ...(await load_Query_userConnection({ event, variables: { first: 10 } }))
    };
}