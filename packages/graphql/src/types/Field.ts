export type Field = {
    name: string;
    alias?: string | null | undefined;
    arguments?: unknown | undefined;
    parent?: Field | null | undefined;
    fields?: Field[] | null | undefined;
}

export const fieldToString = (field: Field): string => {
    if (field.fields && field.fields.length > 0) {
        return `${field.alias ? field.alias + ':' : ''}${field.name} {
    ${field.fields.map(subField => fieldToString(subField)).join('\r\n')}
}`;
    } else {
        return `${field.alias ? field.alias + ':' : ''}${field.name}`;
    }
}

export const fieldsDeep = (fields: Field[]): number => {
    return fields.reduce((deep, field) => {
        if (field.fields) {
            const subDeep = fieldsDeep(field.fields) + 1;
            if (subDeep > deep) {
                return subDeep;
            }
        }
        return deep;
    }, 1)
}