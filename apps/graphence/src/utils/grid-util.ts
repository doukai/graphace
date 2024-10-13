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
import type { Errors } from '@graphace/commons';

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

export const createEditors = (errors: Record<string, Errors>[] | undefined) => {
    return {
        string: (
            column: ColumnDataSchemaModel,
            save: (value: SaveData, preventFocus?: boolean) => void,
            close: (focusNext?: boolean) => void
        ): EditorBase => {
            return {
                element: null,
                editCell: undefined,
                render(createElement: HyperFunc<VNode>) {
                    return createElement(
                        'div',
                        {},
                        createElement(
                            'input',
                            {
                                class: 'input input-xs',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                    save(value, true);
                }
            };
        },
        numeric: (
            column: ColumnDataSchemaModel,
            save: (value: SaveData, preventFocus?: boolean) => void,
            close: (focusNext?: boolean) => void
        ): EditorBase => {
            return {
                element: null,
                editCell: undefined,
                render(createElement: HyperFunc<VNode>) {
                    return createElement(
                        'div',
                        {},
                        createElement(
                            'input',
                            {
                                type: "number",
                                class: 'input input-xs',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                    save(value, true);
                }
            };
        },
        date: (
            column: ColumnDataSchemaModel,
            save: (value: SaveData, preventFocus?: boolean) => void,
            close: (focusNext?: boolean) => void
        ): EditorBase => {
            return {
                element: null,
                editCell: undefined,
                render(createElement: HyperFunc<VNode>) {
                    return createElement(
                        'div',
                        {},
                        createElement(
                            'input',
                            {
                                type: "date",
                                class: 'input input-xs',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                    save(value, true);
                }
            };
        },
        time: (
            column: ColumnDataSchemaModel,
            save: (value: SaveData, preventFocus?: boolean) => void,
            close: (focusNext?: boolean) => void
        ): EditorBase => {
            return {
                element: null,
                editCell: undefined,
                render(createElement: HyperFunc<VNode>) {
                    return createElement(
                        'div',
                        {},
                        createElement(
                            'time',
                            {
                                type: "date",
                                class: 'input input-xs',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                    save(value, true);
                }
            };
        },
        datetime: (
            column: ColumnDataSchemaModel,
            save: (value: SaveData, preventFocus?: boolean) => void,
            close: (focusNext?: boolean) => void
        ): EditorBase => {
            return {
                element: null,
                editCell: undefined,
                render(createElement: HyperFunc<VNode>) {
                    return createElement(
                        'div',
                        {},
                        createElement(
                            'time',
                            {
                                type: "datetime-local",
                                class: 'input input-xs',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                    save(value, true);
                }
            };
        }
    }
};