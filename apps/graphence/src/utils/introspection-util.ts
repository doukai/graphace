import { get } from 'svelte/store';
import { __schema } from '~/lib/types/introspection.json';
import LL from '$i18n/i18n-svelte';
import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';

export type FieldType = {
    kind: string;
    name?: string | null;
    ofType?: FieldType | null;
};

export const getType = (typeName: string, filedName: string, subFiledName?: string): string | null | undefined => {
    const fieldDefinition = __schema.types
        .find((type) => type.name === typeName)
        ?.fields?.find((field) => field.name === filedName);
    const fieldType = getFiledType(fieldDefinition?.type);
    if (subFiledName) {
        const subFieldDefinition = __schema.types
            .find((type) => type.name === fieldType)
            ?.fields?.find((field) => field.name === subFiledName);
        return getFiledType(subFieldDefinition?.type);
    }
    return fieldType;
};

export const getFiledType = (fieldType: FieldType | null | undefined): string | null | undefined => {
    if (fieldType) {
        if (fieldType.kind === 'LIST' || fieldType.kind === 'NON_NULL') {
            return getFiledType(fieldType?.ofType);
        }
    }
    return fieldType?.name;
};

export const isEnum = (typeName: string): boolean => {
    return __schema.types
        .find((type) => type.name === typeName)
        ?.kind === 'ENUM' || false;
};

export const getGridType = (typeName: string, filedName: string, subFiledName?: string): Record<string, any> | undefined => {
    const fieldType = getType(typeName, filedName, subFiledName);
    if (fieldType) {
        if (isEnum(fieldType)) {
            return {
                columnType: 'select',
                labelKey: 'label',
                valueKey: 'value',
                source: __schema.types
                    .find((type) => type.name === fieldType)
                    ?.enumValues
                    ?.map(enumValue => {
                        const enumName = fieldType as keyof NamespaceGraphqlTranslation['enums'];
                        const enumValues = get(LL).graphql.enums[enumName].values;
                        return { label: enumValues[enumValue.name as keyof typeof enumValues].name(), value: enumValue.name };
                    })
            }
        }
        switch (fieldType) {
            case 'Int':
            case 'Float':
            case 'BigInteger':
            case 'BigDecimal':
                return { columnType: 'numeric' };
            case 'DateTime':
            case 'Timestamp':
                return { columnType: 'date' };
        }
    }
}