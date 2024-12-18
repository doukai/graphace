import type { Operator } from ".";

export type NumberExpression = {
    val?: number | null | undefined;
    arr?: (number | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}