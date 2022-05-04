import { Operator } from "./Operator";
import type { Sort } from "./Sort";
import type { __Field } from "./__Field";

export type __FieldFilter = {
    __field: __Field;
    opr: Operator;
    val: string | number | boolean | string[] | number[] | boolean[];
    sort: Sort;
}

export const createFilter = (__field: __Field) => {
    return { __field, opr: Operator.EQ, val: null, sort: null };
}