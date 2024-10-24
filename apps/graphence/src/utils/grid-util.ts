import { get } from 'svelte/store';
import type { __Schema } from '@graphace/graphql';
import { createGrid } from '@graphace/ui-graphql';
import LL from '$i18n/i18n-svelte';
import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';
import { __schema } from '~/lib/types/introspection.json';

export const {
    getGridTheme,
    getGridType,
    createEditors,
    fieldsToColumns,
    fieldsToAggColumns,
    nodesToSource,
    nodesToAggSource,
    errorsToGridErrors,
    sourceToMutationList,
    exportToXlsx,
    importFromXlsx
} = createGrid(
    __schema as unknown as __Schema,
    (boolean) => {
        if (boolean === true) {
            return get(LL).graphence.components.grid.boolean.true();
        } else {
            return get(LL).graphence.components.grid.boolean.false();
        }
    },
    (enumName, enumValueName) => {
        const values = get(LL).graphql.enums[enumName as keyof NamespaceGraphqlTranslation['enums']].values;
        return values[enumValueName as keyof typeof values].name();
    },
    (objectName) => {
        return get(LL).graphql.objects[objectName as keyof NamespaceGraphqlTranslation['objects']].name();;
    },
    (objectName, fieldName) => {
        const fields = get(LL).graphql.objects[objectName as keyof NamespaceGraphqlTranslation['objects']].fields;
        return fields[fieldName as keyof typeof fields].name();
    }
);