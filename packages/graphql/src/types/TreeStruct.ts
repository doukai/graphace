import { StringExpression } from "./StringExpression.js";

export type TreeStruct = {
    id: string;
    parentId?: string | null | undefined;
    name?: string | null | undefined;
}

export type TreeStructInput = {
    id?: string | null | undefined;
    parentId?: string | null | undefined;
    name?: string | null | undefined;
}

export type TreeStructExpression = {
    id?: StringExpression | null | undefined;
    parentId?: StringExpression | null | undefined;
    name?: StringExpression | null | undefined;
}