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
import { read, utils, writeFileXLSX } from 'xlsx';
import type { Errors } from '@graphace/commons';
import { fieldsDeep, type __Schema, type __Type, Field } from '@graphace/graphql';

export const createGrid = (
    __schema: __Schema,
    getBooleanLabel: (boolean: boolean) => string,
    getEnumValueLabel: (enumName: string, enumValueName: string) => string,
    getObjectLabel: (objectName: string) => string,
    getFieldLabel: (objectName: string, fieldName: string) => string
) => {

    const getGridTheme = (theme: string | undefined): string | undefined => {
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

    const getGridType = (typeName: string, filedName: string, subFiledName?: string): Record<string, any> | undefined => {
        const filed = subFiledName ?
            __schema.getType(__schema.getType(typeName)?.getField(filedName)?.getType().getNamedType().getName())?.getField(subFiledName) :
            __schema.getType(typeName)?.getField(filedName);
        if (filed) {
            if (filed.getType().getNamedType().isEnum()) {
                return {
                    editor: 'enum',
                    source: __schema.getType(filed.getType().getNamedType().getName())
                        ?.getEnumValues()
                        ?.map(enumValue => ({ label: getEnumValueLabel(filed.getType().getNamedType().getName(), enumValue.getName()), value: enumValue.getName() }))
                };
            }
            switch (filed.getType().getNamedType().getName()) {
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
    };

    const createEditors = (getErrors: () => Record<string, Errors>[] | undefined) => {
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
                                            value: getBooleanLabel(true)
                                        },
                                        getBooleanLabel(true)
                                    ),
                                    createElement(
                                        'option',
                                        {
                                            value: getBooleanLabel(false)
                                        },
                                        getBooleanLabel(false)
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
                                column.column.source.forEach((item: { label: string }) => {
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

    const fieldsToColumns = (typeName: string, fields: Field[], source: DataType[], gridErrors: Record<string, Errors>[] | undefined, getFieldName: (fieldName: string, subFieldName?: string) => string): ColumnRegular[] | ColumnGrouping[] => {
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
    };

    const fieldsToAggColumns = (typeName: string, groupBy: string[], fields: Field[], getFieldName: (fieldName: string, subFieldName?: string) => string, getGrouByName: (fieldName: string) => string): ColumnRegular[] | ColumnGrouping[] => {
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
    };

    const booleanNameToValue = (name: string | null | undefined): boolean | null | undefined => {
        if (name === getBooleanLabel(true)) {
            return true;
        } else if (name === getBooleanLabel(false)) {
            return false;
        } else if (name === null) {
            return null;
        }
    };

    const booleanValueToName = (value: boolean | null | undefined): string | null | undefined => {
        if (value === true) {
            return getBooleanLabel(true);
        } else if (value === false) {
            return getBooleanLabel(false);
        } else if (value === null) {
            return null;
        }
    };

    const enumNameToValue = (typeName: string, name: string | null | undefined): string | null | undefined => {
        return __schema.getType(typeName)
            ?.getEnumValues()
            ?.find(enumValue => getEnumValueLabel(typeName, enumValue.getName()) === name)
            .getName()
    };

    const enumValueToName = (typeName: string, value: string | null | undefined): string | null | undefined => {
        return getEnumValueLabel(typeName, value);
    };

    const getTypeFieldName = (value: any, typeName: string, fieldName: string, subFieldName?: string): any | null | undefined => {
        if (subFieldName) {
            const subFieldType = __schema.getType(__schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType().getName())?.getField(subFieldName)?.getType().getNamedType();
            if (subFieldType) {
                if (Array.isArray(value)) {
                    if (subFieldType.getName() === 'Boolean') {
                        return value.map(item => booleanValueToName(item));
                    } else if (subFieldType.isEnum()) {
                        return value.map(item => enumValueToName(subFieldType.getName(), item));
                    } else {
                        return value;
                    }
                } else {
                    if (subFieldType.getName() === 'Boolean') {
                        return booleanValueToName(value);
                    } else if (subFieldType.isEnum()) {
                        return enumValueToName(subFieldType.getName(), value);
                    } else {
                        return value;
                    }
                }
            }
        }
        const fieldType = __schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType();
        if (fieldType) {
            if (Array.isArray(value)) {
                if (fieldType.getName() === 'Boolean') {
                    return value.map(item => booleanValueToName(item));
                } else if (fieldType.isEnum()) {
                    return value.map(item => enumValueToName(fieldType.getName(), item));
                } else {
                    return value;
                }
            } else {
                if (fieldType.getName() === 'Boolean') {
                    return booleanValueToName(value);
                } else if (fieldType.isEnum()) {
                    return enumValueToName(fieldType.getName(), value);
                } else {
                    return value;
                }
            }
        }
    };

    const getTypeFieldValue = (value: any, typeName: string, fieldName: string, subFieldName?: string): any | null | undefined => {
        if (subFieldName) {
            const subFieldType = __schema.getType(__schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType().getName())?.getField(subFieldName)?.getType().getNamedType();
            if (subFieldType) {
                if (Array.isArray(value)) {
                    if (subFieldType.getName() === 'Boolean') {
                        return value.map(item => booleanNameToValue(item));
                    } else if (subFieldType.isEnum()) {
                        return value.map(item => enumNameToValue(subFieldType.getName(), item));
                    } else {
                        return value;
                    }
                } else {
                    if (subFieldType.getName() === 'Boolean') {
                        return booleanNameToValue(value);
                    } else if (subFieldType.isEnum()) {
                        return enumNameToValue(subFieldType.getName(), value);
                    } else {
                        return value;
                    }
                }
            }
        }
        const fieldType = __schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType();
        if (fieldType) {
            if (Array.isArray(value)) {
                if (fieldType.getName() === 'Boolean') {
                    return value.map(item => booleanNameToValue(item));
                } else if (fieldType.isEnum()) {
                    return value.map(item => enumNameToValue(fieldType.getName(), item));
                } else {
                    return value;
                }
            } else {
                if (fieldType.getName() === 'Boolean') {
                    return booleanNameToValue(value);
                } else if (fieldType.isEnum()) {
                    return enumNameToValue(fieldType.getName(), value);
                } else {
                    return value;
                }
            }
        }
    };

    const nodesToSource = <T>(typeName: string, queryFields: Field[], nodes: (T | null | undefined)[] | undefined): DataType[] | undefined => {
        const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
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
                                                getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, field.name, subField.name)
                                            ]);
                                        } else {
                                            return [[field.name, getTypeFieldName(node?.[field.name as keyof T], typeName, field.name)]];
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
    };

    const nodesToAggSource = <T>(typeName: string, groupBy: string[], fields: Field[], nodes: (T | null | undefined)[] | undefined): DataType[] | undefined => {
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
    };

    const errorsToGridErrors = <T>(typeName: string, errors: Record<number, Errors>, queryFields: Field[], nodes: (T | null | undefined)[] | undefined): Record<string, Errors>[] | undefined => {
        if (errors && Object.keys(errors).length) {
            const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
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
    };

    const sourceToMutationList = <T>(typeName: string, idFieldName: string, queryFields: Field[], source: DataType[]): T[] => {
        const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
        if (join) {
            return source?.reduce((nodes: T[], row) => {
                const object = Object.fromEntries(
                    join!.fields?.map((subField) => [
                        subField.name,
                        getTypeFieldValue(row?.[`${join.name}.${subField.name}`], typeName, join.name, subField.name)
                    ]) || []
                );
                if (
                    Object.values(object).filter((value) => value).length > 0 &&
                    row[idFieldName] &&
                    nodes.some((node: T) => node[idFieldName] === row[idFieldName])
                ) {
                    nodes
                        .find((node: T) => node[idFieldName] === row[idFieldName])
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
                    nodes.some((node: T) =>
                        queryFields
                            .filter((field) => field.name !== join.name)
                            .filter((field) => !field.fields)
                            .every((field) => node[field.name] === row[field.name])
                    )
                ) {
                    nodes
                        .find((node: T) =>
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
                            [...queryFields, new Field({ name: 'isDeprecated' })].map((field) => {
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
                        ) as T
                    );
                }
                return nodes;
            }, <T[]>[])
                .filter(row => !Object.values(row).every(col => col === null || col === undefined));
        } else {
            return source?.map((row) =>
                Object.fromEntries(
                    [...queryFields, new Field({ name: 'isDeprecated' })].map((field) => {
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
                ) as T
            )
                .filter(row => !Object.values(row).every(col => col === null || col === undefined));
        }
    };

    const exportToXlsx = <T>(typeName: string, fields: Field[], nodes: (T | null | undefined)[] | undefined): void => {
        const join = fields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
        const json = nodes?.flatMap((node) => {
            if (join) {
                const array = node?.[join.name as keyof T];
                if (Array.isArray(array) && array.length > 0) {
                    return array
                        .map((item) => {
                            if (join.fields && join.fields.length > 0) {
                                return join.fields.map((subField) => {
                                    const subFieldType = __schema.getType(typeName)?.getField(join.name)?.getType().getNamedType();
                                    return [
                                        getFieldLabel(typeName, join.name) + getFieldLabel(subFieldType.getName(), subField.name),
                                        getTypeFieldName(item?.[subField.name as keyof typeof item], typeName, join.name, subField.name)
                                    ]
                                });
                            } else {
                                return [[getFieldLabel(typeName, join.name), getTypeFieldName(node?.[join.name as keyof T], typeName, join.name)]];
                            }
                        })
                        .map((item) =>
                            Object.fromEntries([
                                ...item,
                                ...fields
                                    .filter((field) => field.name !== join.name)
                                    .flatMap((field) => {
                                        if (field.fields && field.fields.length > 0) {
                                            const object = node?.[field.name as keyof T];
                                            return field.fields.map((subField) => {
                                                const subFieldType = __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType();
                                                return [
                                                    getFieldLabel(typeName, field.name) + getFieldLabel(subFieldType.getName(), subField.name),
                                                    getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, field.name, subField.name)
                                                ]
                                            });
                                        } else {
                                            return [[getFieldLabel(typeName, field.name), getTypeFieldName(node?.[field.name as keyof T], typeName, field.name)]];
                                        }
                                    })
                            ])
                        );
                }
            }
            return [
                Object.fromEntries(
                    fields.flatMap((field) => {
                        if (field.fields && field.fields.length > 0) {
                            const object = node?.[field.name as keyof T];
                            return field.fields.map((subField) => {
                                const subFieldType = __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType();
                                return [
                                    getFieldLabel(typeName, field.name) + getFieldLabel(subFieldType.getName(), subField.name),
                                    getTypeFieldName(object?.[subField.name as keyof typeof object], typeName, field.name, subField.name)
                                ]
                            });
                        } else {
                            return [[getFieldLabel(typeName, field.name), getTypeFieldName(node?.[field.name as keyof T], typeName, field.name)]];
                        }
                    })
                )
            ];
        });

        const ws = utils.json_to_sheet(json || []);
        const wb = utils.book_new();
        const name = getObjectLabel(typeName);
        utils.book_append_sheet(wb, ws, name);
        writeFileXLSX(wb, `${name}.xlsx`);
    };

    const importFromXlsx = async (columns: ColumnRegular[] | ColumnGrouping[], file: File): Promise<DataType[]> => {
        const data = await file.arrayBuffer();
        const wb = read(data);
        return utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            .map(object =>
                Object.fromEntries(
                    Object.entries(object as object)
                        .map(entry => {
                            const column = columns.find((column) => column.name === entry[0] || (column as ColumnGrouping).children?.some(child => child.name === entry[0]));
                            if (column) {
                                if ((column as ColumnRegular).name == entry[0]) {
                                    return [(column as ColumnRegular)?.prop, entry[1]];
                                } else {
                                    return [((column as ColumnGrouping).children?.find(child => child.name === entry[0]) as ColumnRegular)?.prop, entry[1]];
                                }
                            }
                        })
                        .filter(entry => entry !== undefined)
                )
            );
    };

    return {
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
    };
}
