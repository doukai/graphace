import { StringExpression } from "./StringExpression.js";

export type NamedStruct = {
    id?: string | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type QueryNamedStructArgs = {
    id?: StringExpression | undefined;
    name?: StringExpression | undefined,
    first?: number | undefined
}