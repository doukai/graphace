import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_userConnection, load_GroupNodesQuery, loadAll, Operator } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    return await loadAll(
        load_Query_userConnection({ event, variables: { first: 10 } }),
        load_GroupNodesQuery({ event, variables: { deep: { opr: Operator.LT, val: 2 }, path: { opr: Operator.LK, val: '/%' } } })
    );
}