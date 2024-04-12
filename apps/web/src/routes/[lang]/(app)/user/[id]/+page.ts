import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_user } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        ...(await load_Query_user({ event, variables: { id: { val: event.params.id } } }))
    };
}