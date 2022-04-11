import { Operator } from "./Operator";
import type { Sort } from "./Sort";
import type { __Field } from "./__Field";

export class __FieldFilter {
    __field: __Field;
    opr: Operator = Operator.EQ;
    val: string | number | boolean | null = null;
    sort: Sort = null;
    constructor(__field: __Field) {
        this.__field = __field;
    }
}