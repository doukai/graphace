import type { __Type } from '@graphace/graphql';
import { __schema } from '~/lib/types/introspection.json';

export const getTypeFieldTypeName = (typeName: string, fieldName: string, subFieldName?: string): string | null | undefined => {
    const fieldDefinition = __schema.types
        .find((type) => type.name === typeName)
        ?.fields?.find((field) => field.name === fieldName);
    const fieldType = getFieldTypeName(fieldDefinition?.type as __Type | null | undefined);
    if (subFieldName) {
        const subFieldDefinition = __schema.types
            .find((type) => type.name === fieldType)
            ?.fields?.find((field) => field.name === subFieldName);
        return getFieldTypeName(subFieldDefinition?.type as __Type | null | undefined);
    }
    return fieldType;
};

export const typeFieldTypeHasList = (typeName: string, fieldName: string): boolean => {
    const fieldDefinition = __schema.types
        .find((type) => type.name === typeName)
        ?.fields?.find((field) => field.name === fieldName);
    return fieldHasList(fieldDefinition?.type as __Type | null | undefined);
};

export const getFieldType = (fieldType: __Type | null | undefined): __Type | null | undefined => {
    if (fieldType) {
        if (fieldType.kind === 'LIST' || fieldType.kind === 'NON_NULL') {
            return getFieldType(fieldType?.ofType);
        }
    }
    return fieldType;
};

export const getFieldTypeName = (fieldType: __Type | null | undefined): string | null | undefined => {
    return getFieldType(fieldType)?.name;
};

export const fieldHasList = (fieldType: __Type | null | undefined): boolean => {
    if (fieldType) {
        if (fieldType.kind === 'NON_NULL') {
            return fieldHasList(fieldType?.ofType);
        }
        return fieldType.kind === 'LIST';
    }
    return false;
};

export const isEnum = (typeName: string): boolean => {
    return __schema.types
        .find((type) => type.name === typeName)
        ?.kind === 'ENUM' || false;
};

export const getType = (typeName: string) => {
    return __schema.types
        .find((type) => type.name === typeName);
};

export const getIdFieldName = (typeName: string, fieldName?: string): string | null | undefined => {
    const typeDefinition = getType(typeName);
    if (fieldName) {
        const fieldDefinition = typeDefinition
            ?.fields?.find((field) => field.name === fieldName);
        const fieldTypeDefinition = getFieldType(fieldDefinition?.type as __Type | null | undefined)
        if (fieldTypeDefinition?.name) {
            return getIdFieldName(fieldTypeDefinition.name);
        }
        return undefined;
    }
    return typeDefinition
        ?.fields?.find((field) => getFieldTypeName(field.type as unknown as __Type | null | undefined) === 'ID')?.name;
};