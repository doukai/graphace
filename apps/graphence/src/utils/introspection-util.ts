import { get } from 'svelte/store';
import { __schema } from '~/lib/types/introspection.json';
import LL from '$i18n/i18n-svelte';
import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';

export type FieldType = {
    kind: string;
    name?: string | null;
    ofType?: FieldType | null;
};

export const getTypeFiledTypeName = (typeName: string, filedName: string, subFiledName?: string): string | null | undefined => {
    const fieldDefinition = __schema.types
        .find((type) => type.name === typeName)
        ?.fields?.find((field) => field.name === filedName);
    const fieldType = getFiledTypeName(fieldDefinition?.type);
    if (subFiledName) {
        const subFieldDefinition = __schema.types
            .find((type) => type.name === fieldType)
            ?.fields?.find((field) => field.name === subFiledName);
        return getFiledTypeName(subFieldDefinition?.type);
    }
    return fieldType;
};

export const getFiledTypeName = (fieldType: FieldType | null | undefined): string | null | undefined => {
    if (fieldType) {
        if (fieldType.kind === 'LIST' || fieldType.kind === 'NON_NULL') {
            return getFiledTypeName(fieldType?.ofType);
        }
    }
    return fieldType?.name;
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