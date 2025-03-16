import { NumberExpression } from "./NumberExpression.js";
import { StringExpression } from "./StringExpression.js";

export type TreeStruct = {
    id?: string | undefined;
    name?: string | null | undefined;
    path?: string | null | undefined;
    deep?: number | null | undefined;
    parentId?: string | null | undefined;
}

export type QueryTreeStructArgs = {
    id?: StringExpression | undefined;
    deep?: NumberExpression | undefined,
    path?: StringExpression | undefined,
    name?: StringExpression | undefined
}