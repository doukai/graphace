import { type Operator, __TypeKind } from "./index.js";

export type __TypeKindExpression = {
    val?: __TypeKind | null | undefined;
    arr?: (__TypeKind | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}