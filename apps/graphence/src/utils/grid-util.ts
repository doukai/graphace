import { get } from 'svelte/store';
import type {
    ColumnDataSchemaModel,
    SaveData,
    HyperFunc,
    VNode,
    EditorBase
} from '@revolist/svelte-datagrid';
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
            case 'Boolean':
                return { columnType: 'boolean', editor: 'boolean' };
            case 'Int':
            case 'Float':
            case 'BigInteger':
            case 'BigDecimal':
                return { columnType: 'numeric', editor: 'numeric' };
            case 'Date':
                return { columnType: 'date', editor: 'date' };
            case 'Time':
                return { columnType: 'time', editor: 'time' };
            case 'DateTime':
            case 'Timestamp':
                return { columnType: 'datetime', editor: 'datetime' };
        }
        return { columnType: 'string', editor: 'string' };
    }
}

export const editors = {
    boolean: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input', {
                    type: "checkbox",
                    checked: true
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    },
    string: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input');
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    },
    numeric: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input', {
                    type: "number"
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    },
    date: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input', {
                    type: "date"
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    },
    time: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input', {
                    type: "time"
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    },
    datetime: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                return createElement('input', {
                    type: "datetime-local"
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    }
};