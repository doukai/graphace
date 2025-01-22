import type { __Schema, __Type } from '../types';

export const createIntrospection = (__schema: __Schema) => {

    const getType = (typeName: string, fieldName?: string): __Type | null | undefined => {
        const typeDefinition = __schema.types?.find((type) => type.name === typeName) as __Type;
        if (fieldName) {
            const fieldDefinition = typeDefinition?.fields?.find((field) => field.name === fieldName);
            const fieldType = getFieldType(fieldDefinition?.type)
            if (fieldType?.name) {
                return getType(fieldType.name);
            }
            return undefined;
        }
        return typeDefinition;
    };

    const isScalar = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'SCALAR' || false;
    };

    const isEnum = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'ENUM' || false;
    };

    const isObject = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'OBJECT' || false;
    };

    const isInputObject = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'INPUT_OBJECT' || false;
    };

    const isInterface = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'INTERFACE' || false;
    };

    const isUnion = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'UNION' || false;
    };

    const isNonNull = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'NON_NULL' || false;
    };

    const isList = (typeName: string): boolean => {
        return getType(typeName)?.kind === 'LIST' || false;
    };

    const getFieldType = (fieldType: __Type | null | undefined): __Type | null | undefined => {
        if (fieldType) {
            if (fieldType.kind === 'LIST' || fieldType.kind === 'NON_NULL') {
                return getFieldType(fieldType?.ofType);
            }
            return getType(fieldType.name!);
        }
    };

    const getTypeFieldType = (typeName: string, fieldName: string, subFieldName?: string): __Type | null | undefined => {
        const fieldDefinition = getType(typeName)?.fields?.find((field) => field.name === fieldName);
        const fieldType = getFieldType(fieldDefinition?.type);
        if (subFieldName && fieldType) {
            const subFieldDefinition = fieldType?.fields?.find((field) => field.name === subFieldName);
            return getFieldType(subFieldDefinition?.type);
        }
        return fieldType;
    };

    const getFieldTypeName = (fieldType: __Type | null | undefined): string | null | undefined => {
        return getFieldType(fieldType)?.name;
    };

    const getTypeFieldTypeName = (typeName: string, fieldName: string, subFieldName?: string): string | null | undefined => {
        return getTypeFieldType(typeName, fieldName, subFieldName)?.name;
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

    const typeFieldTypeHasList = (typeName: string, fieldName: string, subFieldName?: string): boolean => {
        const fieldDefinition = getType(typeName)?.fields?.find((field) => field.name === fieldName);
        if (subFieldName) {
            const fieldType = getFieldType(fieldDefinition?.type);
            const subFieldDefinition = fieldType?.fields?.find((field) => field.name === subFieldName);
            return fieldHasList(subFieldDefinition?.type);
        }
        return fieldHasList(fieldDefinition?.type);
    };

    const fieldTypeIsNonNull = (fieldType: __Type | null | undefined): boolean => {
        if (fieldType) {
            return fieldType.kind === 'NON_NULL';
        }
        return false;
    };

    const typeFieldTypeIsNonNull = (typeName: string, fieldName: string, subFieldName?: string): boolean => {
        const fieldDefinition = getType(typeName)?.fields?.find((field) => field.name === fieldName);
        if (subFieldName) {
            const fieldType = getFieldType(fieldDefinition?.type);
            const subFieldDefinition = fieldType?.fields?.find((field) => field.name === subFieldName);
            return fieldTypeIsNonNull(subFieldDefinition?.type);
        }
        return fieldTypeIsNonNull(fieldDefinition?.type);
    };

    const getIdFieldName = (typeName: string, fieldName?: string): string | null | undefined => {
        const typeDefinition = getType(typeName);
        if (fieldName) {
            const fieldDefinition = typeDefinition?.fields?.find((field) => field.name === fieldName);
            const fieldType = getFieldType(fieldDefinition?.type)
            if (fieldType?.name) {
                return getIdFieldName(fieldType.name);
            }
            return undefined;
        }
        return typeDefinition?.fields?.find((field) => getFieldTypeName(field.type) === 'ID')?.name;
    };

    return {
        getType,
        isScalar,
        isEnum,
        isObject,
        isInputObject,
        isInterface,
        isUnion,
        isNonNull,
        isList,
        getFieldType,
        getFieldTypeName,
        getTypeFieldTypeName,
        fieldHasList,
        typeFieldTypeHasList,
        fieldTypeIsNonNull,
        typeFieldTypeIsNonNull,
        getIdFieldName
    };
}