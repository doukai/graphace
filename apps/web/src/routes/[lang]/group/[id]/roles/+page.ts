import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_group_roles } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_group_roles({ event, variables: { group_id: { val: event.params.id }, first: 10 } }))
    };
}