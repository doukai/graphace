import { get } from 'svelte/store';
import type {
    ColumnDataSchemaModel,
    SaveData,
    HyperFunc,
    VNode,
    EditorBase
} from '@revolist/svelte-datagrid';
import { getTypeFieldTypeName, getType, isEnum } from '~/utils';
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
    const fieldType = getTypeFieldTypeName(typeName, filedName, subFiledName);
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
                return {
                    columnType: 'select',
                    labelKey: 'label',
                    valueKey: 'value',
                    source: [
                        { label: get(LL).graphence.components.grid.boolean.true(), value: true },
                        { label: get(LL).graphence.components.grid.boolean.false(), value: false }
                    ]
                };
            case 'Int':
            case 'Float':
            case 'BigInteger':
            case 'BigDecimal':
                return { columnType: 'numeric', editor: 'numeric' };
            case 'Date':
                return { editor: 'date' };
            case 'Time':
                return { editor: 'time' };
            case 'DateTime':
            case 'Timestamp':
                return { editor: 'datetime' };
        }
        return { editor: 'string' };
    }
}

export const editors = {
    string: (
        column: ColumnDataSchemaModel,
        save: (value: SaveData, preventFocus?: boolean) => void,
        close: (focusNext?: boolean) => void
    ): EditorBase => {
        return {
            element: null, // will be setup up after render
            editCell: undefined, // will be setup up after render
            render(createElement: HyperFunc<VNode>) {
                debugger
                return createElement(
                    'div',
                    {
                        class: 'tooltip tooltip-open',
                        'data-tip': 'hello'
                    },
                    createElement(
                        'input',
                        {
                            value: column.value
                        }
                    )
                );
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save(((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value);
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
                    type: "number",
                    value: column.value
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
                    type: "date",
                    value: column.value
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
                    type: "time",
                    value: column.value
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
                    type: "datetime-local",
                    value: column.value
                });
            },
            componentDidRender() { }, // optional, called after component rendered
            disconnectedCallback() {
                save((this.element as HTMLInputElement)?.value);
            } // optional, called after component destroyed
        };
    }
};