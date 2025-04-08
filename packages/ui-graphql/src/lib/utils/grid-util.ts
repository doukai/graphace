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

    const getGridType = (typeName: string, fieldName: string, subFieldName?: string): Record<string, any> | undefined => {
        const field = subFieldName ?
            __schema.getType(__schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType().getName())?.getField(subFieldName) :
            __schema.getType(typeName)?.getField(fieldName);
        if (field) {
            if (field.getType().getNamedType().isEnum()) {
                return {
                    editor: 'enum',
                    hasList: field.getType().hasList(),
                    source: __schema.getType(field.getType().getNamedType().getName())
                        ?.getEnumValues()
                        ?.map(enumValue => ({ label: getEnumValueLabel(field.getType().getNamedType().getName(), enumValue.getName()), value: enumValue.getName() }))
                };
            }
            switch (field.getType().getNamedType().getName()) {
                case 'Boolean':
                    return {
                        editor: 'boolean',
                        hasList: field.getType().hasList()
                    };
                case 'Int':
                case 'Float':
                case 'BigInteger':
                case 'BigDecimal':
                    if (field.getType().hasList()) {
                        return {
                            editor: 'numeric',
                            hasList: field.getType().hasList()
                        };
                    } else {
                        return {
                            columnType: 'numeric',
                            editor: 'numeric',
                            hasList: field.getType().hasList()
                        };
                    }
                case 'Date':
                    return {
                        editor: 'date',
                        hasList: field.getType().hasList()
                    };
                case 'Time':
                    return {
                        editor: 'time',
                        hasList: field.getType().hasList()
                    };
                case 'DateTime':
                case 'Timestamp':
                    return {
                        editor: 'datetime',
                        hasList: field.getType().hasList()
                    };
            }
            return {
                editor: 'string',
                hasList: field.getType().hasList()
            };
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
                        if (column.column.hasList) {
                            return createElement(
                                'div',
                                { class: 'join w-full' },
                                [
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const div = this.element as HTMLDivElement;
                                                if (div.childNodes.length > 2) {
                                                    div.removeChild(div.childNodes[1]);
                                                }
                                            }
                                        },
                                        '-'
                                    ),
                                    ...column.value
                                        ?.split(',')
                                        ?.map((item: any) =>
                                            createElement(
                                                'input',
                                                {
                                                    class: 'input input-bordered input-xs join-item',
                                                    value: item
                                                }
                                            )
                                        ) || [],
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const input = document.createElement('input');
                                                input.className = 'input input-xs join-item';
                                                input.value = '';
                                                const div = this.element as HTMLDivElement;
                                                div.insertBefore(input, div.childNodes[div.childNodes.length - 1]);
                                            }
                                        },
                                        '+'
                                    )
                                ]
                            );
                        } else {
                            return createElement(
                                'div',
                                {},
                                createElement(
                                    'input',
                                    {
                                        class: 'input input-bordered input-xs w-full',
                                        value: column.value
                                    }
                                )
                            );
                        }
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
                        let value = '';
                        if (column.column.hasList) {
                            const div = this.element as HTMLDivElement;
                            if (div.childNodes.length > 2) {
                                value = div.childNodes.values().toArray()
                                    .slice(1, div.childNodes.length - 1)
                                    .map(input => (input as HTMLInputElement).value)
                                    .filter(item => item)
                                    .join(',');
                            }
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                        }
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
                                    class: 'select select-bordered select-xs w-full',
                                    multiple: column.column.hasList
                                },
                                [
                                    createElement(
                                        'option',
                                        {
                                            value: ''
                                        },
                                        ''
                                    ),
                                    createElement(
                                        'option',
                                        {
                                            value: getBooleanLabel(true),
                                            selected: column.column.hasList ?
                                                column.value?.split(',')?.some((text: string) => text === getBooleanLabel(true)) :
                                                column.value === getBooleanLabel(true)
                                        },
                                        getBooleanLabel(true)
                                    ),
                                    createElement(
                                        'option',
                                        {
                                            value: getBooleanLabel(false),
                                            selected: column.column.hasList ?
                                                column.value?.split(',')?.some((text: string) => text === getBooleanLabel(false)) :
                                                column.value === getBooleanLabel(false)
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
                        let value = '';
                        if (column.column.hasList) {
                            value = Object.values(((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.selectedOptions)
                                .filter(selectedOption => selectedOption.value)
                                .map(selectedOption => selectedOption.value)
                                .join(",");
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.value;
                        }
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
                        if (column.column.hasList) {
                            return createElement(
                                'div',
                                { class: 'join w-full' },
                                [
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const div = this.element as HTMLDivElement;
                                                if (div.childNodes.length > 2) {
                                                    div.removeChild(div.childNodes[1]);
                                                }
                                            }
                                        },
                                        '-'
                                    ),
                                    ...column.value
                                        ?.split(',')
                                        ?.map((item: any) =>
                                            createElement(
                                                'input',
                                                {
                                                    type: 'number',
                                                    class: 'input input-bordered input-xs join-item',
                                                    value: item
                                                }
                                            )
                                        ) || [],
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const input = document.createElement('input');
                                                input.className = 'input input-xs join-item';
                                                input.value = '';
                                                const div = this.element as HTMLDivElement;
                                                div.insertBefore(input, div.childNodes[div.childNodes.length - 1]);
                                            }
                                        },
                                        '+'
                                    )
                                ]
                            );
                        } else {
                            return createElement(
                                'div',
                                {},
                                createElement(
                                    'input',
                                    {
                                        type: 'number',
                                        class: 'input input-bordered input-xs w-full',
                                        value: column.value
                                    }
                                )
                            );
                        }
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
                        let value = '';
                        if (column.column.hasList) {
                            const div = this.element as HTMLDivElement;
                            if (div.childNodes.length > 2) {
                                value = div.childNodes.values().toArray()
                                    .slice(1, div.childNodes.length - 1)
                                    .map(input => (input as HTMLInputElement).value)
                                    .filter(item => item !== null && item !== undefined)
                                    .map(item => '' + item)
                                    .join(',');
                            }
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                        }
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
                        if (column.column.hasList) {
                            return createElement(
                                'div',
                                { class: 'join w-full' },
                                [
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const div = this.element as HTMLDivElement;
                                                if (div.childNodes.length > 2) {
                                                    div.removeChild(div.childNodes[1]);
                                                }
                                            }
                                        },
                                        '-'
                                    ),
                                    ...column.value
                                        ?.split(',')
                                        ?.map((item: any) =>
                                            createElement(
                                                'input',
                                                {
                                                    type: 'date',
                                                    class: 'input input-bordered input-xs join-item',
                                                    value: item
                                                }
                                            )
                                        ) || [],
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const input = document.createElement('input');
                                                input.className = 'input input-xs join-item';
                                                input.value = '';
                                                const div = this.element as HTMLDivElement;
                                                div.insertBefore(input, div.childNodes[div.childNodes.length - 1]);
                                            }
                                        },
                                        '+'
                                    )
                                ]
                            );
                        } else {
                            return createElement(
                                'div',
                                {},
                                createElement(
                                    'input',
                                    {
                                        type: 'date',
                                        class: 'input input-bordered input-xs w-full',
                                        value: column.value
                                    }
                                )
                            );
                        }
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
                        let value = '';
                        if (column.column.hasList) {
                            const div = this.element as HTMLDivElement;
                            if (div.childNodes.length > 2) {
                                value = div.childNodes.values().toArray()
                                    .slice(1, div.childNodes.length - 1)
                                    .map(input => (input as HTMLInputElement).value)
                                    .filter(item => item)
                                    .join(',');
                            }
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                        }
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
                        if (column.column.hasList) {
                            return createElement(
                                'div',
                                { class: 'join w-full' },
                                [
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const div = this.element as HTMLDivElement;
                                                if (div.childNodes.length > 2) {
                                                    div.removeChild(div.childNodes[1]);
                                                }
                                            }
                                        },
                                        '-'
                                    ),
                                    ...column.value
                                        ?.split(',')
                                        ?.map((item: any) =>
                                            createElement(
                                                'input',
                                                {
                                                    type: 'time',
                                                    class: 'input input-bordered input-xs join-item',
                                                    value: item
                                                }
                                            )
                                        ) || [],
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const input = document.createElement('input');
                                                input.className = 'input input-xs join-item';
                                                input.value = '';
                                                const div = this.element as HTMLDivElement;
                                                div.insertBefore(input, div.childNodes[div.childNodes.length - 1]);
                                            }
                                        },
                                        '+'
                                    )
                                ]
                            );
                        } else {
                            return createElement(
                                'div',
                                {},
                                createElement(
                                    'input',
                                    {
                                        type: 'time',
                                        class: 'input input-bordered input-xs w-full',
                                        value: column.value
                                    }
                                )
                            );
                        }
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
                        let value = '';
                        if (column.column.hasList) {
                            const div = this.element as HTMLDivElement;
                            if (div.childNodes.length > 2) {
                                value = div.childNodes.values().toArray()
                                    .slice(1, div.childNodes.length - 1)
                                    .map(input => (input as HTMLInputElement).value)
                                    .filter(item => item)
                                    .join(',');
                            }
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                        }
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
                        if (column.column.hasList) {
                            return createElement(
                                'div',
                                { class: 'join w-full' },
                                [
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const div = this.element as HTMLDivElement;
                                                if (div.childNodes.length > 2) {
                                                    div.removeChild(div.childNodes[1]);
                                                }
                                            }
                                        },
                                        '-'
                                    ),
                                    ...column.value
                                        ?.split(',')
                                        ?.map((item: any) =>
                                            createElement(
                                                'input',
                                                {
                                                    type: 'datetime-local',
                                                    class: 'input input-bordered input-xs join-item',
                                                    value: item
                                                }
                                            )
                                        ) || [],
                                    createElement(
                                        'button',
                                        {
                                            class: 'btn btn-neutral btn-xs join-item',
                                            onclick: () => {
                                                const input = document.createElement('input');
                                                input.className = 'input input-xs join-item';
                                                input.value = '';
                                                const div = this.element as HTMLDivElement;
                                                div.insertBefore(input, div.childNodes[div.childNodes.length - 1]);
                                            }
                                        },
                                        '+'
                                    )
                                ]
                            );
                        } else {
                            return createElement(
                                'div',
                                {},
                                createElement(
                                    'input',
                                    {
                                        type: 'datetime-local',
                                        class: 'input input-bordered input-xs w-full',
                                        value: column.value
                                    }
                                )
                            );
                        }
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
                        let value = '';
                        if (column.column.hasList) {
                            const div = this.element as HTMLDivElement;
                            if (div.childNodes.length > 2) {
                                value = div.childNodes.values().toArray()
                                    .slice(1, div.childNodes.length - 1)
                                    .map(input => (input as HTMLInputElement).value)
                                    .filter(item => item)
                                    .join(',');
                            }
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLInputElement)?.value;
                        }
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
                                    class: 'select select-bordered select-xs w-full',
                                    multiple: column.column.hasList
                                },
                                [
                                    createElement(
                                        'option',
                                        {
                                            value: ''
                                        },
                                        ''
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
                            if (this.editCell) {
                                column.column.source.forEach((item: { label: string }) => {
                                    const option = document.createElement("option");
                                    option.value = item.label;
                                    option.text = item.label;
                                    option.selected = column.column.hasList ?
                                        column.value?.split(',')?.some((text: string) => text === item.label) :
                                        column.value === item.label;
                                    ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement).appendChild(option);
                                })
                            }
                            ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.focus();
                        }
                    },
                    disconnectedCallback() {
                        let value = '';
                        if (column.column.hasList) {
                            value = Object.values(((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.selectedOptions)
                                .filter(selectedOption => selectedOption.value)
                                .map(selectedOption => selectedOption.value)
                                .join(",");
                        } else {
                            value = ((this.element as HTMLDivElement)?.children[0] as HTMLSelectElement)?.value;
                        }
                        save(value, true);
                    }
                };
            }
        }
    };

    const fieldsToColumns = (typeName: string, fields: Field[], source: DataType[], gridErrors: Record<string, Errors>[] | undefined, getFieldName: (fieldName: string, subFieldName?: string | undefined) => string | undefined): ColumnRegular[] | ColumnGrouping[] => {
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

    const fieldsToAggColumns = (typeName: string, groupBy: string[], fields: Field[], getFieldName: (fieldName: string, subFieldName?: string | undefined) => string | undefined, getGrouByName: (fieldName: string) => string | undefined): ColumnRegular[] | ColumnGrouping[] => {
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
                        return value.map(item => booleanValueToName(item)).join(',');
                    } else if (subFieldType.isEnum()) {
                        return value.map(item => enumValueToName(subFieldType.getName(), item)).join(',');
                    } else {
                        return value.map(item => '' + item).join(',');
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
                    return value.map(item => booleanValueToName(item)).join(',');
                } else if (fieldType.isEnum()) {
                    return value.map(item => enumValueToName(fieldType.getName(), item)).join(',');
                } else {
                    return value.map(item => '' + item).join(',');
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
        if (value === null || value === undefined) {
            return value;
        }
        if (subFieldName) {
            const subFieldType = __schema.getType(__schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType().getName())?.getField(subFieldName)?.getType().getNamedType();
            const hasList = __schema.getType(__schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType().getName())?.getField(subFieldName)?.getType().hasList();
            if (subFieldType) {
                if (value === '' || value === null || value === undefined) {
                    return null;
                } else if (hasList && typeof value === 'string' && value.includes(',')) {
                    if (subFieldType.isEnum()) {
                        return value.split(',').map((item: string) => enumNameToValue(subFieldType.getName(), item));
                    } else {
                        switch (subFieldType.getName()) {
                            case 'Boolean':
                                return value.split(',').map((item: string) => booleanNameToValue(item));
                            case 'Int':
                            case 'BigInteger':
                                return value.split(',').map((item: string) => Number.parseInt(item));
                            case 'Float':
                            case 'BigDecimal':
                                return value.split(',').map((item: string) => Number.parseFloat(item));
                            default:
                                return value.split(',');
                        }
                    }
                } else if (hasList) {
                    if (subFieldType.isEnum()) {
                        return [enumNameToValue(subFieldType.getName(), value)];
                    } else {
                        switch (subFieldType.getName()) {
                            case 'Boolean':
                                return [booleanNameToValue(value)];
                            case 'Int':
                            case 'BigInteger':
                                return [Number.parseInt(value)];
                            case 'Float':
                            case 'BigDecimal':
                                return [Number.parseFloat(value)];
                            default:
                                return ['' + value];
                        }
                    }
                } else {
                    if (subFieldType.isEnum()) {
                        return enumNameToValue(subFieldType.getName(), value);
                    } else {
                        switch (subFieldType.getName()) {
                            case 'Boolean':
                                return booleanNameToValue(value);
                            case 'Int':
                            case 'BigInteger':
                                return Number.parseInt(value);
                            case 'Float':
                            case 'BigDecimal':
                                return Number.parseFloat(value);
                            default:
                                return '' + value;
                        }
                    }
                }
            }
        }
        const fieldType = __schema.getType(typeName)?.getField(fieldName)?.getType().getNamedType();
        const hasList = __schema.getType(typeName)?.getField(fieldName)?.getType().hasList();
        if (fieldType) {
            if (value === '' || value === null || value === undefined) {
                return null;
            } else if (typeof value === 'string' && value.includes(',')) {
                if (fieldType.isEnum()) {
                    return value.split(',').map(item => enumNameToValue(fieldType.getName(), item));
                } else {
                    switch (fieldType.getName()) {
                        case 'Boolean':
                            return value.split(',').map((item: string) => booleanNameToValue(item));
                        case 'Int':
                        case 'BigInteger':
                            return value.split(',').map((item: string) => Number.parseInt(item));
                        case 'Float':
                        case 'BigDecimal':
                            return value.split(',').map((item: string) => Number.parseFloat(item));
                        default:
                            return value.split(',');
                    }
                }
            } else if (hasList) {
                if (fieldType.isEnum()) {
                    return [enumNameToValue(fieldType.getName(), value)];
                } else {
                    switch (fieldType.getName()) {
                        case 'Boolean':
                            return [booleanNameToValue(value)];
                        case 'Int':
                        case 'BigInteger':
                            return [Number.parseInt(value)];
                        case 'Float':
                        case 'BigDecimal':
                            return [Number.parseFloat(value)];
                        default:
                            return ['' + value];
                    }
                }
            } else {
                if (fieldType.isEnum()) {
                    return enumNameToValue(fieldType.getName(), value);
                } else {
                    switch (fieldType.getName()) {
                        case 'Boolean':
                            return booleanNameToValue(value);
                        case 'Int':
                        case 'BigInteger':
                            return Number.parseInt(value);
                        case 'Float':
                        case 'BigDecimal':
                            return Number.parseFloat(value);
                        default:
                            return '' + value;
                    }
                }
            }
        }
    };

    const nodesToSource = <T>(typeName: string, queryFields: Field[], nodes: (T | null | undefined)[] | null | undefined): DataType[] | undefined => {
        const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType().isObject() && __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
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

    const nodesToAggSource = <T>(typeName: string, groupBy: string[], fields: Field[], nodes: (T | null | undefined)[] | null | undefined): DataType[] | undefined => {
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

    const errorsToGridErrors = <T>(typeName: string, errors: Record<number, Errors>, queryFields: Field[], nodes: (T | null | undefined)[] | null | undefined): Record<string, Errors>[] | undefined => {
        if (errors && Object.keys(errors).length) {
            const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType().isObject() && __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
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
        const join = queryFields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType().isObject() && __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
        if (join) {
            return source
                ?.reduce((nodes: T[], row) => {
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
                .filter((row: T) => !Object.values(row).every(col => col === null || col === undefined));
        } else {
            return source
                ?.map((row) =>
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

    const exportToXlsx = <T>(typeName: string, fields: Field[], nodes: (T | null | undefined)[] | null | undefined): void => {
        const join = fields.find((field) => __schema.getType(typeName)?.getField(field.name)?.getType().getNamedType().isObject() && __schema.getType(typeName)?.getField(field.name)?.getType().hasList());
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

    const importFromXlsx = async (typeName: string, columns: ColumnRegular[] | ColumnGrouping[], file: File): Promise<DataType[]> => {
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
                                    const prop = (column as ColumnRegular)?.prop as string;
                                    return [prop, getTypeFieldValue(entry[1], typeName, prop)];
                                } else {
                                    const prop = ((column as ColumnGrouping).children?.find(child => child.name === entry[0]) as ColumnRegular)?.prop as string;
                                    const props = prop.split('.');
                                    return [prop, getTypeFieldValue(entry[1], typeName, props[0], props[1])];
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
