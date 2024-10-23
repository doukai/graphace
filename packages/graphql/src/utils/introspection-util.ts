import type { __Schema, __Type } from '../types';

export const createIntrospection = (__schema: __Schema) => {

    const getType = (typeName: string): __Type => {
        return __schema.types?.find((type) => type.name === typeName) as unknown as __Type;
    };

    const isEnum = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'ENUM' || false;
    };

    const getTypeFieldTypeName = (typeName: string, fieldName: string, subFieldName?: string): string | null | undefined => {
        const fieldDefinition = getType(typeName)?.fields?.find((field) => field.name === fieldName);
        const fieldTypeName = getFieldTypeName(fieldDefinition?.type as __Type | null | undefined);
        if (subFieldName && fieldTypeName) {
            const subFieldDefinition = getType(fieldTypeName)?.fields?.find((field) => field.name === subFieldName);
            return getFieldTypeName(subFieldDefinition?.type as __Type | null | undefined);
        }
        return fieldTypeName;
    };

    const getFieldType = (fieldType: __Type | null | undefined): __Type | null | undefined => {
        if (fieldType) {
            if (fieldType.kind === 'LIST' || fieldType.kind === 'NON_NULL') {
                return getFieldType(fieldType?.ofType);
            }
            return fieldType;
        }
    };

    const getFieldTypeName = (fieldType: __Type | null | undefined): string | null | undefined => {
        return getFieldType(fieldType)?.name;
    };

    const typeFieldTypeHasList = (typeName: string, fieldName: string): boolean => {
        const fieldDefinition = getType(typeName)?.fields?.find((field) => field.name === fieldName);
        return fieldHasList(fieldDefinition?.type as __Type | null | undefined);
    };

    const fieldHasList = (fieldType: __Type | null | undefined): boolean => {
        if (fieldType) {
            if (fieldType.kind === 'NON_NULL') {
                return fieldHasList(fieldType?.ofType);
            }
            return fieldType.kind === 'LIST';
        }
        return false;
    };

    const getIdFieldName = (typeName: string, fieldName?: string): string | null | undefined => {
        const typeDefinition = getType(typeName);
        if (fieldName) {
            const fieldDefinition = typeDefinition?.fields?.find((field) => field.name === fieldName);
            const fieldTypeDefinition = getFieldType(fieldDefinition?.type as __Type | null | undefined)
            if (fieldTypeDefinition?.name) {
                return getIdFieldName(fieldTypeDefinition.name);
            }
            return undefined;
        }
        return typeDefinition?.fields?.find((field) => getFieldTypeName(field.type as unknown as __Type | null | undefined) === 'ID')?.name;
    };

    return {
        getType,
        isEnum,
        getTypeFieldTypeName,
        getFieldType,
        getFieldTypeName,
        typeFieldTypeHasList,
        fieldHasList,
        getIdFieldName
    };
}