import { TypeManager } from '@graphace/graphql/types/TypeManager';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const manager: TypeManager = new TypeManager();

export const load: PageLoad = ({ params }) => {
    if (params.type) {
        return {
            typeName: manager.urlToTypeName(params.type)
        };
    }

    throw error(404, 'Not found');
}