import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        ...(await load_Query_roleConnection({ event, variables: { first: 10 } }))
    };
}