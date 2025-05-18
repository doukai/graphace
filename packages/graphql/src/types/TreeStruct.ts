import { StringExpression } from "./StringExpression.js";

export type TreeStruct = {
    [key: string]: any;
    parentId?: string | null | undefined;
    name?: string | null | undefined;
}

export type TreeStructInput = {
    [key: string]: any;
    parentId?: string | null | undefined;
    name?: string | null | undefined;
}

export type TreeStructExpression = {
    [key: string]: any;
    parentId?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
}