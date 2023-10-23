import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const notBelongToParent = { not: true, permissions: { name: { val: event.params.id } } };
    return {
        id: event.params.name,
        notBelongToParent,
        ...(await load_Query_roleConnection({ event, variables: { first: 10, ...notBelongToParent } }))
    };
}