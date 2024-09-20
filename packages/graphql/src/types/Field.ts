export type Field = {
    name: string;
    alias?: string | null | undefined;
    arguments?: unknown | undefined;
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