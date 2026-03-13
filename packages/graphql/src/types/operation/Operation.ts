import { Field } from "./index.js";
import { Directive } from "../index.js";

export type Operation = {
    operationType: 'query' | 'mutation';
    name?: string | undefined;
    fields: Field[];
    directives?: Directive[] | undefined;
}