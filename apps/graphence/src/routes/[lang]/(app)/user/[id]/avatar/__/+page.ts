import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_fileConnection } from '$houdini';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('File');
    return {
        id: event.params.id,
        ...(await load_Query_fileConnection({ event, variables: { first: 10 } }))
    };
}