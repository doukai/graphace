import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_subscriptionType_userList } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_subscriptionType_userList({ event, variables: { subscriptionType_: { val: event.params.id } } }))
    };
}