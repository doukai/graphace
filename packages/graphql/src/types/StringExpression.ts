import type { Operator } from ".";

export type StringExpression = {
    val?: string | null | undefined;
    in?: (string | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}