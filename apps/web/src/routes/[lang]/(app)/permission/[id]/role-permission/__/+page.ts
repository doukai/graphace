import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_rolePermissionConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.name,
        ...(await load_Query_rolePermissionConnection({ event, variables: { first: 10 } }))
    };
}