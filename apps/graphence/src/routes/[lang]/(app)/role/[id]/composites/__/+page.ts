import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    const notBelongToParent = { not: true, composites: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        ...(await load_Query_roleConnection({ event, variables: { first: 10, exs: [notBelongToParent] } }))
    };
}