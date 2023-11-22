import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_userConnection } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    const notBelongToParent = { not: true, roles: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        ...(await load_Query_userConnection({ event, variables: { first: 10, exs: [notBelongToParent] } }))
    };
}