import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_permission } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        ...(await load_Query_permission({ event, variables: { name: { val: event.params.id } } }))
    };
}