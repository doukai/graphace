import { TypeManager } from '@graphace/graphql/types/TypeManager';
const manager: TypeManager = new TypeManager();

export function getTypeVariables({ params }) {
    return {
        typeName: manager.urlToTypeName(params.type)
    }
}