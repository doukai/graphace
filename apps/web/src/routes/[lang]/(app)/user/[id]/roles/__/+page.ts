import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_roleConnection } from '$houdini';
import { Operator } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        id: event.params.id,
        ...(await load_Query_roleConnection({ event, variables: { first: 10,userRole: { userId: { opr: Operator.NEQ, val: parseInt(event.params.id) } } }}))
    };
}