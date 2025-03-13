import { StringExpression } from "./StringExpression.js";

export type NamedStruct = {
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type QueryNamedStructArgs = {
    name?: StringExpression | undefined,
    first?: number | undefined
}