import { createIntrospection, type __Schema } from '@graphace/graphql';
import { __schema } from '~/lib/types/introspection.json';

export const {
    getType,
    isScalar,
    isEnum,
    isObject,
    isInputObject,
    isInterface,
    isUnion,
    isNonNull,
    isList,
    getField,
    getFieldType,
    getTypeFieldType,
    getFieldTypeName,
    getTypeFieldTypeName,
    fieldHasList,
    typeFieldTypeHasList,
    fieldTypeIsNonNull,
    typeFieldTypeIsNonNull,
    getIdFieldName
} = createIntrospection(__schema as __Schema);