import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_group_subGroups } from '$houdini';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    return {
        id: event.params.id,
        ...(await load_Query_group_subGroups({ event, variables: { group_id: { val: event.params.id }, first: 10 } }))
    };
}