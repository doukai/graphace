import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_realm } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    return {
        ...(await load_Query_realm({ event, variables: { id: { val: event.params.id } } }))
    };
}