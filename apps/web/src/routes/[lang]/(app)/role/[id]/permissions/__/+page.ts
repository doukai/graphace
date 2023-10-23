import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_permissionConnection } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    const notBelongToParent = { not: true, roles: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        ...(await load_Query_permissionConnection({ event, variables: { first: 10, ...notBelongToParent } }))
    };
}