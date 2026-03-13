import { Conditional, StringExpression } from "./index.js";

export type NamedStruct = {
    id?: string | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type NamedStructExpression = {
    id?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
    description?: StringExpression | null | undefined;
}

export type NamedStructQueryArguments = {
    id?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
    description?: StringExpression | null | undefined;
    not?: boolean | undefined;
    cond?: Conditional | undefined;
    exs?: [NamedStructExpression] | undefined;
    first?: number | undefined;
    last?: number | undefined;
    offset?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
}