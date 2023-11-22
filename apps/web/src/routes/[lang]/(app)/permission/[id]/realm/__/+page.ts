import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_realmConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    return {
        id: event.params.name,
        ...(await load_Query_realmConnection({ event, variables: { first: 10 } }))
    };
}