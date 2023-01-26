import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_userTest2Connection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_userTest2Connection({ event, variables: { first: 10 } }))
    };
}