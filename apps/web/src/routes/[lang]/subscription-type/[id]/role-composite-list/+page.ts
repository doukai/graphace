import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_subscriptionType_roleCompositeList } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_subscriptionType_roleCompositeList({ event, variables: { subscriptionType_: { val: event.params.id } } }))
    };
}