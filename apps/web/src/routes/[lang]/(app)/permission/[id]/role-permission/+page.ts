import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_permission_rolePermission } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.id,
        ...(await load_Query_permission_rolePermission({ event, variables: { permission_name: { val: event.params.id }, first: 10 } }))
    };
}