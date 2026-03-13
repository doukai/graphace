import { Conditional, StringExpression } from "./index.js";

export type TreeStruct = {
    id?: string | null | undefined;
    parentId?: string | null | undefined;
    name?: string | null | undefined;
}

export type TreeStructExpression = {
    id?: StringExpression | null | undefined;
    parentId?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
}

export type TreeStructQueryArguments = {
    id?: StringExpression | null | undefined;
    parentId?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
    not?: boolean | undefined;
    cond?: Conditional | undefined;
    exs?: [TreeStructExpression] | undefined;
    first?: number | undefined;
    last?: number | undefined;
    offset?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
}