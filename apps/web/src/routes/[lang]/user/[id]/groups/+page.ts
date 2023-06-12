import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_user_groups } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_user_groups({ event, variables: { user_id: { val: event.params.id }, first: 10 } }))
    };
}