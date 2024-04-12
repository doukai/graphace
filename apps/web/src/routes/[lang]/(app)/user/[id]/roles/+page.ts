import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_user_roles } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        id: event.params.id,
        ...(await load_Query_user_roles({ event, variables: { user_id: { val: event.params.id }, first: 10 } }))
    };
}