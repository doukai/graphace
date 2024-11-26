import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_user_groups } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    return {
        id: event.params.id,
        ...(await load_Query_user_groups({ event, variables: { user_id: { val: event.params.id }, first: 10 } }))
    };
}