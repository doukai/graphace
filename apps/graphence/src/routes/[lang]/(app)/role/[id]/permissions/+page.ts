import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_role_permissions } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        id: event.params.id,
        ...(await load_Query_role_permissions({ event, variables: { role_id: { val: event.params.id }, first: 10 } }))
    };
}