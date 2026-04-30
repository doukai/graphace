import { Directive } from "../index.js";

export type Field = {
    name: string;
    alias?: string | undefined;
    args?: Record<string, unknown> | undefined;
    fields?: Field[] | undefined;
    directives?: Directive[] | undefined;
}

export function field(name: string, ...fields: Field[]): Field {
    return {
        name,
        fields
    }
}

export function fieldWithArgs(name: string, ...fields: Field[]): (args?: Record<string, unknown> | undefined) => Field {
    return (args?: Record<string, unknown> | undefined): Field => ({
        name,
        args,
        fields
    });
}