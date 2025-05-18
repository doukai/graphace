import { StringExpression } from "./StringExpression.js";

export type NamedStruct = {
    [key: string]: any;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type NamedStructInput = {
    [key: string]: any;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type NamedStructExpression = {
    [key: string]: any;
    name?: StringExpression | null | undefined,
    description?: StringExpression | null | undefined,
}