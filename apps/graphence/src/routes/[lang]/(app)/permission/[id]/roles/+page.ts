import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_permission_roles } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    return {
        id: event.params.id,
        ...(await load_Query_permission_roles({ event, variables: { permission_name: { val: event.params.id }, first: 10 } }))
    };
}