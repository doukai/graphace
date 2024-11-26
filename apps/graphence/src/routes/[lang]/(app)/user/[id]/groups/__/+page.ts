import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_groupConnection } from '$houdini';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group');
    const notBelongToParent = { not: true, users: { id: { val: event.params.id } } };
    return {
        id: event.params.id,
        notBelongToParent,
        ...(await load_Query_groupConnection({ event, variables: { first: 10, exs: [notBelongToParent] } }))
    };
}