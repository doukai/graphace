import { get } from 'svelte/store';
import { getTypeFiledTypeName, getType, isEnum } from '~/utils';
import LL from '$i18n/i18n-svelte';
import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';

export const getGridTheme = (theme: string | undefined): string | undefined => {
    if (theme) {
        if (
            theme === 'dark' ||
            theme === 'synthwave' ||
            theme === 'halloween' ||
            theme === 'forest' ||
            theme === 'black' ||
            theme === 'luxury' ||
            theme === 'dracula' ||
            theme === 'business' ||
            theme === 'night' ||
            theme === 'coffee'
        ) {
            return 'darkMaterial';
        }
    }
};

export const getGridType = (typeName: string, filedName: string, subFiledName?: string): Record<string, any> | undefined => {
    const fieldType = getTypeFiledTypeName(typeName, filedName, subFiledName);
    if (fieldType) {
        if (isEnum(fieldType)) {
            return {
                columnType: 'select',
                labelKey: 'label',
                valueKey: 'value',
                source: getType(fieldType)
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