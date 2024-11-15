import { Directive, directiveToString } from "./Directive.js";

export type Field = {
    name: string;
    alias?: string | null | undefined;
    arguments?: unknown | undefined;
    parent?: Field | null | undefined;
    fields?: Field[] | null | undefined;
    directives?: Directive[] | null | undefined;
}

export const fieldToString = (field: Field): string => {
    if (field.fields && field.fields.length > 0) {
        return `${field.alias ? field.alias + ':' : ''}${field.name} {
    ${field.fields.map(subField => fieldToString(subField)).join('\r\n')}
}`;
    } else {
        return `${field.alias ? field.alias + ':' : ''}${field.name}${field.directives ? ' ' + field.directives.map(directive => directiveToString(directive)).join(' ') : ''}`;
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