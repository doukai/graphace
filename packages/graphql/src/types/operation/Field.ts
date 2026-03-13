import { Directive } from "../index.js";

export type Field = {
    name: string;
    alias?: string | undefined;
    args?: Record<string, unknown> | undefined;
    parent?: Field | undefined;
    fields?: Field[] | undefined;
    directives?: Directive[] | undefined;
}