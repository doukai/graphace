import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_PermissionTypesQuery } from '$houdini';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        id: event.params.id,
        ...(await load_PermissionTypesQuery({ event, variables: { first: 10 } }))
    };
}