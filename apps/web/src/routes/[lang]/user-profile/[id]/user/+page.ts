import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_userProfile_user } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_userProfile_user({ event, variables: { userProfile_id: { val: event.params.id } } }))
    };
}