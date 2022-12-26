import type { Operator } from ".";

export type BooleanExpression = {
    val?: boolean | null | undefined;
    in?: (boolean | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}