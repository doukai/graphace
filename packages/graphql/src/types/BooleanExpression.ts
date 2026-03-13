import type { Operator } from "./index.js";

export type BooleanExpression = {
    val?: boolean | null | undefined;
    arr?: (boolean | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}