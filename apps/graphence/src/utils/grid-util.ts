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
import { getTypeFieldTypeName, getType, isEnum, typeFieldTypeHasList } from '~/utils';
import LL from '$i18n/i18n-svelte';
import type { NamespaceGraphqlTranslation } from '$i18n/i18n-types';
import type { Errors } from '@graphace/commons';
import { fieldsDeep, type Field } from '@graphace/graphql';

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
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
                        const message = errors?.[this.editCell?.y!]?.[column.prop]?.errors?.[0]?.message;
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
                                item?.[subField.name as keyof typeof item] as unknown
                            ]);
                        } else {
                            return [[join.name, node?.[join.name as keyof T]]];
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
                                            object?.[subField.name as keyof typeof object] as unknown
                                        ]);
                                    } else {
                                        return [[field.name, node?.[field.name as keyof T]]];
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
                            object?.[subField.name as keyof typeof object] as unknown
                        ]);
                    } else {
                        return [[field.name, node?.[field.name as keyof T]]];
                    }
                })
            )
        ];
    });
}

export const nodesToAggSource = <T>(groupBy: string[], fields: Field[], nodes: (T | null | undefined)[] | undefined): DataType[] | undefined => {
    return nodes?.map((node) =>
        Object.fromEntries([
            ...(groupBy || []).map((fieldName) => [
                fieldName,
                node?.[fieldName as keyof T]
            ]),
            ...fields.flatMap((field) => {
                if (field.fields && field.fields.length > 0) {
                    const object = node?.[field.name as keyof T];
                    return field.fields.map((subField) => [
                        `${field.name}.${subField.name}`,
                        object?.[subField.name as keyof typeof object] as unknown
                    ]);
                } else {
                    return [[field.name, node?.[field.name as keyof T]]];
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
                    row?.[`${join.name}.${subField.name}`]
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
                                row?.[`${join.name}.${subField.name}`]
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
                                row?.[`${join.name}.${subField.name}`]
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
                                        row?.[`${field.name}.${subField.name}`]
                                    ])
                                );
                                if (Object.values(object).filter((value) => value).length > 0) {
                                    return [field.name, field.name === join.name ? [object] : object];
                                }
                                return [field.name, field.name === join.name ? [] : null];
                            } else {
                                return [
                                    field.name,
                                    field.name === join.name ? [row?.[field.name]] : row?.[field.name]
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
                                row?.[`${field.name}.${subField.name}`]
                            ])
                        );
                        if (Object.values(object).filter((value) => value).length > 0) {
                            return [field.name, object];
                        }
                        return [field.name, null];
                    } else {
                        return [field.name, row?.[field.name]];
                    }
                })
            )
        )
            .filter(row => !Object.values(row).every(col => col === null || col === undefined));
    }
}