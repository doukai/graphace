import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_role_userRole } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_role_userRole({ event, variables: { role_id: { val: event.params.id }, first: 10 } }))
    };
}