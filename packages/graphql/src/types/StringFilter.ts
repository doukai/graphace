import type { Operator, Sort } from ".";

export type StringFilter = {
    opr?: Operator;
    val?: string | null | (string | null | undefined)[];
    sort?: Sort;
}