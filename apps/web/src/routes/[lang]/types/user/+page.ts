import { TypeManager } from '@graphace/graphql/types/TypeManager';
// import { error } from '@sveltejs/kit';
// import type { PageLoad } from './$types';
import type { LoadEvent } from '@sveltejs/kit';
import {
    Conditional,
    load_QueryUserConnection,
    GQL_QueryUserConnection,
    GQL_MutationUser,
    QueryUserConnection$input,
    UserOrderBy
} from '$houdini';
import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types';

const manager: TypeManager = new TypeManager();

// export const load: PageLoad = ({ event, params }) => {


//     if (params.type) {
//         return {
//             typeName: manager.urlToTypeName(params.type),
//             queryUserConnectionStore: load_QueryUserConnection({ event })
//         };
//     }

//     throw error(404, 'Not found');
// }
export const load: LayoutLoad = async (event: LoadEvent) => {

    return {
        ...(await load_QueryUserConnection({ event }))
    };
}