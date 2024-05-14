import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_group_users } from '$houdini';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        id: event.params.id,
        ...(await load_Query_group_users({ event, variables: { group_id: { val: event.params.id }, first: 10 } }))
    };
}