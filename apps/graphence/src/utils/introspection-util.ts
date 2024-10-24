import { createIntrospection, type __Schema } from '@graphace/graphql';
import { __schema } from '~/lib/types/introspection.json';

export const {
    getType,
    isEnum,
    getTypeFieldTypeName,
    getFieldType,
    getFieldTypeName,
    typeFieldTypeHasList,
    fieldHasList,
    getIdFieldName
} = createIntrospection(__schema as unknown as __Schema);