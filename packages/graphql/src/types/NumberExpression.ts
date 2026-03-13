import type { Operator } from "./index.js";

export type NumberExpression = {
    val?: number | null | undefined;
    arr?: (number | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}