import { StringExpression } from "./StringExpression.js";

export type NamedStruct = {
    id: string;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type NamedStructInput = {
    id?: string | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type NamedStructExpression = {
    id?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined,
    description?: StringExpression | null | undefined,
}