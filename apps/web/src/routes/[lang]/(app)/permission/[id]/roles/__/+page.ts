import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role');
    const notBelongToParent = { not: true, permissions: { name: { val: event.params.id } } };
    return {
        id: event.params.name,
        notBelongToParent,
        ...(await load_Query_roleConnection({ event, variables: { first: 10, exs: [notBelongToParent] } }))
    };
}