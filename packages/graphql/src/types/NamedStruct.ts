import { StringExpression } from "./StringExpression.js";

export type NamedStruct = {
    [id: string]: string;
} & {
    name?: string | null | undefined;
    description?: string | null | undefined;
}

export type QueryNamedStructArgs = {
    [id: string]: StringExpression | number | undefined;
} & {
    name?: StringExpression | undefined,
    first?: number | undefined
}