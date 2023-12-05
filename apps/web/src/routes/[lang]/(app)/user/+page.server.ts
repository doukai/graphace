import type { ServerLoadEvent } from '@sveltejs/kit';
import { Query_userConnectionStore, GroupNodesQueryStore, Operator } from '$houdini';
import { permissions } from '~/lib/utils/auth-util';
import type { PageServerLoad } from './$houdini'

// export const load: PageServerLoad = async (event: ServerLoadEvent) => {
//     await permissions.getTypes('User');
//     const query_userConnection = new Query_userConnectionStore();
//     const { data } = await query_userConnection.fetch({ event, variables: { first: 10 } });
//     const groupNodesQueryStore = await new GroupNodesQueryStore();
//     const groupNodes = await groupNodesQueryStore.fetch({ event, variables: { deep: { opr: Operator.LT, val: 2 }, path: { opr: Operator.LK, val: '/%' } } });
//     return { data: { user: data, group: groupNodes.data } };
// }