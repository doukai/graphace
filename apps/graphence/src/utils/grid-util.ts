import { get } from 'svelte/store';
import type {
    ColumnDataSchemaModel,
    SaveData,
    HyperFunc,
    VNode,
    EditorBase,
    ColumnRegular,
    ColumnGrouping,
    DataType
} from '@revolist/svelte-datagrid';
import type { Errors } from '@graphace/commons';
import { fieldsDeep, type __Type, type Field } from '@graphace/graphql';
import { getTypeFieldTypeName, getType, isEnum, typeFieldTypeHasList, getFieldType } from '~/utils';
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
                editor: 'enum',
                source: getType(fieldType)
                    ?.enumValues
                    ?.map(enumValue => {
                        const enumName = fieldType as keyof NamespaceGraphqlTranslation['enums'];
                        const enumValues = get(LL).graphql.enums[enumName].values;
                        return { label: enumValues[enumValue.name as keyof typeof enumValues].name(), value: enumValue.name };
                    })
            };
        }
        switch (fieldType) {
            case 'Boolean':
                return { editor: 'boolean' };
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

export const createEditors = (getErrors: () => Record<string, Errors>[] | undefined) => {
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
                                class: 'input input-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
        boolean: (
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
                            'select',
                            {
                                class: 'select select-xs w-full',
                                value: column.value
                            },
                            [
                                createElement(
                                    'option',
                                    {
                                        value: get(LL).graphence.components.grid.boolean.true()
                                    },
                                    get(LL).graphence.components.grid.boolean.true()
                                ),
                                createElement(
                                    'option',
                                    {
                                        value: get(LL).graphence.components.grid.boolean.false()
                                    },
                                    get(LL).graphence.components.grid.boolean.false()
                                )
                            ]
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.value;
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
                                class: 'input input-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
                                class: 'input input-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
                                class: 'input input-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
                                class: 'input input-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
        enum: (
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
                            'select',
                            {
                                class: 'select select-xs w-full',
                                value: column.value
                            }
                        )
                    );
                },
                componentDidRender() {
                    if (this.element) {
                        const message = getErrors()?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
                        if (message) {
                            this.element.className = 'tooltip tooltip-open tooltip-right tooltip-error';
                            this.element.setAttribute('data-tip', message);
                        }
                        if (this.editCell) {
                            this.editCell.column.source.forEach((item: { label: string }) => {
                                const option = document.createElement("option");
                                option.value = item.label;
                                option.text = item.label;
                                ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement).appendChild(option);
                            })
                        }
                        ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.focus();
                    }
                },
                disconnectedCallback() {
                    const value = ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.value;
                    save(value, true);
                }
            };
        }
    }
};

export const fieldsToColumns = (typeName: string, fields: Field[], source: DataType[], gridErrors: Record<string, Errors>[] | undefined, getFieldName: (fieldName: string, subFieldName?: string) => string): ColumnRegular[] | ColumnGrouping[] => {
    return fieldsDeep(fields) === 1
        ? (fields.map((field) => ({
            name: getFieldName(field.name),
            prop: field.name,
            autoSize: true,
            editable: true,
            ...getGridType(typeName, field.name),
            cellProperties: ({ rowIndex }) => {
                if (gridErrors?.[rowIndex]?.[field.name]) {
                    return {
                        class: 'bg-error'
                    };
                } else if (source[rowIndex]?.isDeprecated && source[rowIndex]?.isDeprecated === true) {
                    return {
                        class: 'bg-neutral-content'
                    };
                }
                return {};
            }
        })) as ColumnRegular[])
        : (fields.map((field) => {
            if (field.fields && field.fields.length > 0) {
                return {
                    name: getFieldName(field.name),
                    children: field.fields.map((subField) => ({
                        name: getFieldName(field.name, subField.name),
                        prop: `${field.name}.${subField.name}`,
                        autoSize: true,
                        editable: true,
                        ...getGridType(typeName, field.name, subField.name),
                        cellProperties: ({ rowIndex }) => {
                            if (gridErrors?.[rowIndex]?.[`${field.name}.${subField.name}`]) {
                                return {
                                    class: 'bg-error'
                                };
                            } else if (
                                source[rowIndex]?.isDeprecated &&
                                source[rowIndex]?.isDeprecated === true
                            ) {
                                return {
                                    class: 'bg-neutral-content'
                                };
                            }
                            return {};
                        }
                    }))
                };
            } else {
                return {
                    name: '',
                    children: [
                        {
                            name: getFieldName(field.name),
                            prop: field.name,
                            autoSize: true,
                            editable: true,
                            ...getGridType(typeName, field.name),
                            cellProperties: ({ rowIndex }) => {
                                if (gridErrors?.[rowIndex]?.[field.name]) {
                                    return {
                                        class: 'bg-error'
                                    };
                                } else if (
                                    source[rowIndex]?.isDeprecated &&
                                    source[rowIndex]?.isDeprecated === true
                                ) {
                                    return {
                                        class: 'bg-neutral-content'
                                    };
                                }
                                return {};
                            }
                        }
                    ]
                };
            }
        }) as ColumnGrouping[]);
}

export const fieldsToAggColumns = (typeName: string, groupBy: string[], fields: Field[], getFieldName: (fieldName: string, subFieldName?: string) => string, getGrouByName: (fieldName: string) => string): ColumnRegular[] | ColumnGrouping[] => {
    return fieldsDeep(fields) === 1
        ? ([
            ...(groupBy || []).map((fieldName) => ({
                name: getGrouByName(fieldName),
                prop: fieldName,
                autoSize: true,
                readonly: true,
                filter: true,
                sortable: true,
                ...getGridType(typeName, fieldName)
            })),
            ...fields.map((field) => ({
                name: getFieldName(field.name),
                prop: field.name,
                autoSize: true,
                readonly: true,
                filter: true,
                sortable: true,
                ...getGridType(typeName, field.name)
            }))
        ] as ColumnRegular[])
        : ([
            ...(groupBy || []).map((fieldName) => ({
                name: '',
                children: [
                    {
                        name: getGrouByName(fieldName),
                        prop: fieldName,
                        autoSize: true,
                        readonly: true,
                        filter: true,
                        sortable: true,
                        ...getGridType(typeName, fieldName)
                    }
                ]
            })),
            ...fields.map((field) => {
                if (field.fields && field.fields.length > 0) {
                    return {
                        name: getFieldName(field.name),
                        children: field.fields.map((subField) => ({
                            name: getFieldName(field.name, subField.name),
                            prop: `${field.name}.${subField.name}`,
                            autoSize: true,
                            readonly: true,
                            filter: true,
                            sortable: true,
                            ...getGridType(typeName, field.name, subField.name)
                        }))
                    };
                } else {
                    return {
                        name: '',
                        children: [
                            {
                                name: getFieldName(field.name),
                                prop: field.name,
                                autoSize: true,
                                readonly: true,
                                filter: true,
                                sortable: true,
                                ...getGridType(typeName, field.name)
                            }
                        ]
                    };
                }
            })
        ] as ColumnGrouping[]);
}

export const nodesToSource = <T>(typeName: string, queryFields: Field[], nodes: (T | null | undefined)[] | undefined): DataType[] | undefined => {
    const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
    return nodes?.flatMap((node) => {
        if (join) {
            const array = node?.[join.name as keyof T];
            if (Array.isArray(array) && array.length > 0) {
                return array
                    .map((item) => {
                        if (join.fields && join.fields.length > 0) {
                            return join.fields.map((subField) => [
                                `${join.name}.${subField.name}`,
                                getTypeFieldName(item?.[subField.name as keyof typeof item], typeName, join.name, subField.name)
                            ]);
                        } else {
                            return [[join.name, getTypeFieldName(node?.[join.name as keyof T], typeName, join.name)]];
                        }
                    })
                    .map((item) =>
                        Object.fromEntries([
                            ...item,
                            ...queryFields
                                .filter((field) => field.name !== join.name)
                                .flatMap((field) => {
                                    if (field.fields && field.fields.length > 0) {
                                        const object = node?.[field.name as keyof T];
                                        return field.fields.map((subField) => [
                                            `${field.name}.${subField.name}`,
                                            getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, join.name, subField.name)
                                        ]);
                                    } else {
                                        return [[field.name, getTypeFieldName(node?.[field.name as keyof T], typeName, join.name)]];
                                    }
                                })
                        ])
                    );
            }
        }
        return [
            Object.fromEntries(
                queryFields.flatMap((field) => {
                    if (field.fields && field.fields.length > 0) {
                        const object = node?.[field.name as keyof T];
                        return field.fields.map((subField) => [
                            `${field.name}.${subField.name}`,
                            getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, field.name, subField.name)
                        ]);
                    } else {
                        return [[field.name, getTypeFieldName(node?.[field.name as keyof T], typeName, field.name)]];
                    }
                })
            )
        ];
    });
}

export const nodesToAggSource = <T>(typeName: string, groupBy: string[], fields: Field[], nodes: (T | null | undefined)[] | undefined): DataType[] | undefined => {
    return nodes?.map((node) =>
        Object.fromEntries([
            ...(groupBy || []).map((fieldName) => [
                fieldName,
                getTypeFieldName(node?.[fieldName as keyof T], typeName, fieldName)
            ]),
            ...fields.flatMap((field) => {
                if (field.fields && field.fields.length > 0) {
                    const object = node?.[field.name as keyof T];
                    return field.fields.map((subField) => [
                        `${field.name}.${subField.name}`,
                        getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, field.name, subField.name)
                    ]);
                } else {
                    return [[field.name, getTypeFieldName(node?.[field.name as keyof T], typeName, field.name)]];
                }
            })
        ])
    );
}

export const errorsToGridErrors = <T>(typeName: string, errors: Record<number, Errors>, queryFields: Field[], nodes: (T | null | undefined)[] | undefined): Record<string, Errors>[] | undefined => {
    if (errors && Object.keys(errors).length) {
        const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
        return nodes?.flatMap((node, nodeIndex) => {
            if (join) {
                const array = node?.[join.name as keyof T];
                if (Array.isArray(array)) {
                    return array
                        .map((_, index) => {
                            if (join.fields && join.fields.length > 0) {
                                return join.fields.map((subField) => [
                                    `${join.name}.${subField.name}`,
                                    errors[nodeIndex]?.iterms?.[join.name]?.iterms?.[index]?.iterms?.[subField.name]
                                ]);
                            } else {
                                return [[join.name, errors[nodeIndex]?.iterms?.[join.name]]];
                            }
                        })
                        .map((item) =>
                            Object.fromEntries([
                                ...item,
                                ...queryFields
                                    .filter((field) => field.name !== join.name)
                                    .flatMap((field) => {
                                        if (field.fields && field.fields.length > 0) {
                                            return field.fields.map((subField) => [
                                                `${field.name}.${subField.name}`,
                                                errors[nodeIndex]?.iterms?.[field.name]?.iterms?.[subField.name]
                                            ]);
                                        } else {
                                            return [[field.name, errors[nodeIndex]?.iterms?.[field.name]]];
                                        }
                                    })
                            ])
                        );
                }
            }
            return [
                Object.fromEntries(
                    queryFields.flatMap((field) => {
                        if (field.fields && field.fields.length > 0) {
                            return field.fields.map((subField) => [
                                `${field.name}.${subField.name}`,
                                errors[nodeIndex]?.iterms?.[field.name]?.iterms?.[subField.name]
                            ]);
                        } else {
                            return [[field.name, errors[nodeIndex]?.iterms?.[field.name]]];
                        }
                    })
                )
            ];
        });
    } else {
        return [];
    }
}

export const sourceToMutationList = (typeName: string, idFieldName: string, queryFields: Field[], source: DataType[]): DataType[] => {
    const join = queryFields.find((field) => typeFieldTypeHasList(typeName, field.name));
    if (join) {
        return source?.reduce((nodes: DataType[], row) => {
            const object = Object.fromEntries(
                join!.fields?.map((subField) => [
                    subField.name,
                    getTypeFieldValue(row?.[`${join.name}.${subField.name}`], typeName, join.name, subField.name)
                ]) || []
            );
            if (
                Object.values(object).filter((value) => value).length > 0 &&
                row[idFieldName] &&
                nodes.some((node: DataType) => node[idFieldName] === row[idFieldName])
            ) {
                nodes
                    .find((node: DataType) => node[idFieldName] === row[idFieldName])
                    ?.[join.name].push(
                        Object.fromEntries(
                            join!.fields?.map((subField) => [
                                subField.name,
                                getTypeFieldValue(row?.[`${join.name}.${subField.name}`], typeName, join.name, subField.name)
                            ]) || []
                        )
                    );
            } else if (
                Object.values(object).filter((value) => value).length > 0 &&
                nodes.some((node: DataType) =>
                    queryFields
                        .filter((field) => field.name !== join.name)
                        .filter((field) => !field.fields)
                        .every((field) => node[field.name] === row[field.name])
                )
            ) {
                nodes
                    .find((node: DataType) =>
                        queryFields
                            .filter((field) => field.name !== join.name)
                            .filter((field) => !field.fields)
                            .every((field) => node[field.name] === row[field.name])
                    )
                    ?.[join.name].push(
                        Object.fromEntries(
                            join!.fields?.map((subField) => [
                                subField.name,
                                getTypeFieldValue(row?.[`${join.name}.${subField.name}`], typeName, join.name, subField.name)
                            ]) || []
                        )
                    );
            } else {
                nodes.push(
                    Object.fromEntries(
                        [...queryFields, { name: 'isDeprecated' }].map((field) => {
                            if (field.fields && field.fields.length > 0) {
                                const object = Object.fromEntries(
                                    field.fields.map((subField) => [
                                        subField.name,
                                        getTypeFieldValue(row?.[`${field.name}.${subField.name}`], typeName, field.name, subField.name)
                                    ])
                                );
                                if (Object.values(object).filter((value) => value).length > 0) {
                                    return [field.name, field.name === join.name ? [object] : object];
                                }
                                return [field.name, field.name === join.name ? [] : null];
                            } else {
                                return [
                                    field.name,
                                    field.name === join.name ? [getTypeFieldValue(row?.[field.name], typeName, field.name)] : getTypeFieldValue(row?.[field.name], typeName, field.name)
                                ];
                            }
                        })
                    )
                );
            }
            return nodes;
        }, <DataType[]>[])
            .filter(row => !Object.values(row).every(col => col === null || col === undefined));
    } else {
        return source?.map((row) =>
            Object.fromEntries(
                [...queryFields, { name: 'isDeprecated' }].map((field) => {
                    if (field.fields && field.fields.length > 0) {
                        const object = Object.fromEntries(
                            field.fields.map((subField) => [
                                subField.name,
                                getTypeFieldValue(row?.[`${field.name}.${subField.name}`], typeName, field.name, subField.name)
                            ])
                        );
                        if (Object.values(object).filter((value) => value).length > 0) {
                            return [field.name, object];
                        }
                        return [field.name, null];
                    } else {
                        return [field.name, getTypeFieldValue(row?.[field.name], typeName, field.name)];
                    }
                })
            )
        )
            .filter(row => !Object.values(row).every(col => col === null || col === undefined));
    }
}

export const getTypeFieldName = (value: any, typeName: string, fieldName: string, subFieldName?: string): any | null | undefined => {
    const typeDefinition = getType(typeName);
    const fieldDefinition = typeDefinition?.fields?.find((field) => field.name === fieldName);
    const fieldTypeDefinition = getFieldType(fieldDefinition?.type as __Type | null | undefined);
    if (subFieldName) {
        const subFieldDefinition = fieldTypeDefinition?.fields?.find((field) => field.name === subFieldName);
        const subFieldTypeDefinition = getFieldType(subFieldDefinition?.type as __Type | null | undefined);
        if (subFieldTypeDefinition?.name) {
            if (Array.isArray(value)) {
                if (subFieldTypeDefinition.name === 'Boolean') {
                    return value.map(item => booleanValueToName(item));
                } else if (isEnum(subFieldTypeDefinition.name)) {
                    return value.map(item => enumValueToName(subFieldTypeDefinition.name!, item));
                } else {
                    return value;
                }
            } else {
                if (subFieldTypeDefinition.name === 'Boolean') {
                    return booleanValueToName(value);
                } else if (isEnum(subFieldTypeDefinition.name)) {
                    return enumValueToName(subFieldTypeDefinition.name, value);
                } else {
                    return value;
                }
            }
        }
    }
    if (fieldTypeDefinition?.name) {
        if (Array.isArray(value)) {
            if (fieldTypeDefinition.name === 'Boolean') {
                return value.map(item => booleanValueToName(item));
            } else if (isEnum(fieldTypeDefinition.name)) {
                return value.map(item => enumValueToName(fieldTypeDefinition.name!, item));
            } else {
                return value;
            }
        } else {
            if (fieldTypeDefinition.name === 'Boolean') {
                return booleanValueToName(value);
            } else if (isEnum(fieldTypeDefinition.name)) {
                return enumValueToName(fieldTypeDefinition.name, value);
            } else {
                return value;
            }
        }
    }
}

export const getTypeFieldValue = (value: any, typeName: string, fieldName: string, subFieldName?: string): any | null | undefined => {
    const typeDefinition = getType(typeName);
    const fieldDefinition = typeDefinition?.fields?.find((field) => field.name === fieldName);
    const fieldTypeDefinition = getFieldType(fieldDefinition?.type as __Type | null | undefined);
    if (subFieldName) {
        const subFieldDefinition = fieldTypeDefinition?.fields?.find((field) => field.name === subFieldName);
        const subFieldTypeDefinition = getFieldType(subFieldDefinition?.type as __Type | null | undefined);
        if (subFieldTypeDefinition?.name) {
            if (Array.isArray(value)) {
                if (subFieldTypeDefinition.name === 'Boolean') {
                    return value.map(item => booleanNameToValue(item));
                } else if (isEnum(subFieldTypeDefinition.name)) {
                    return value.map(item => enumNameToValue(subFieldTypeDefinition.name!, item));
                } else {
                    return value;
                }
            } else {
                if (subFieldTypeDefinition.name === 'Boolean') {
                    return booleanNameToValue(value);
                } else if (isEnum(subFieldTypeDefinition.name)) {
                    return enumNameToValue(subFieldTypeDefinition.name, value);
                } else {
                    return value;
                }
            }
        }
    }
    if (fieldTypeDefinition?.name) {
        if (Array.isArray(value)) {
            if (fieldTypeDefinition.name === 'Boolean') {
                return value.map(item => booleanNameToValue(item));
            } else if (isEnum(fieldTypeDefinition.name)) {
                return value.map(item => enumNameToValue(fieldTypeDefinition.name!, item));
            } else {
                return value;
            }
        } else {
            if (fieldTypeDefinition.name === 'Boolean') {
                return booleanNameToValue(value);
            } else if (isEnum(fieldTypeDefinition.name)) {
                return enumNameToValue(fieldTypeDefinition.name, value);
            } else {
                return value;
            }
        }
    }
}

export const booleanNameToValue = (name: string | null | undefined): boolean | null | undefined => {
    if (name === get(LL).graphence.components.grid.boolean.true()) {
        return true;
    } else if (name === get(LL).graphence.components.grid.boolean.false()) {
        return false;
    } else if (name === null) {
        return null;
    }
}

export const booleanValueToName = (value: boolean | null | undefined): string | null | undefined => {
    if (value === true) {
        return get(LL).graphence.components.grid.boolean.true();
    } else if (value === false) {
        return get(LL).graphence.components.grid.boolean.false();
    } else if (value === null) {
        return null;
    }
}

export const enumNameToValue = (typeName: string, name: string | null | undefined): string | null | undefined => {
    return getType(typeName)
        ?.enumValues
        ?.filter(enumValue => {
            const enumName = typeName as keyof NamespaceGraphqlTranslation['enums'];
            const enumValues = get(LL).graphql.enums[enumName].values;
            return enumValues[enumValue.name as keyof typeof enumValues].name() === name;
        })
        ?.map(enumValue => enumValue.name)?.[0];
}

export const enumValueToName = (typeName: string, value: string | null | undefined): string | null | undefined => {
    return getType(typeName)
        ?.enumValues
        ?.filter(enumValue => enumValue.name === value)
        ?.map(enumValue => {
            const enumName = typeName as keyof NamespaceGraphqlTranslation['enums'];
            const enumValues = get(LL).graphql.enums[enumName].values;
            return enumValues[enumValue.name as keyof typeof enumValues].name();
        })?.[0];
}