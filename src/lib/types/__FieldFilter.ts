import { Operator } from "./Operator";
import type { Sort } from "./Sort";
import type { __Field } from "./__Field";
import { TypeManager } from '$lib/TypeManager';
import { __TypeKind } from "./__TypeKind";

const manager = new TypeManager();

export type __FieldFilter = {
    __field: __Field;
    opr?: Operator;
    val: string | number | boolean | string[] | number[] | boolean[] | object;
    sort?: Sort;
}

export const createFilter = (__field: __Field): __FieldFilter => {
    if (manager.getFieldTypeKind(__field.type) === __TypeKind.OBJECT) {
        return { __field, val: null };
    }
    return { __field, opr: Operator.EQ, val: null, sort: null };
}

export const addFilter = (__field: __Field, opr: Operator, val: string | number | boolean | string[] | number[] | boolean[] | object): __FieldFilter => {
    return { __field, opr, val, sort: null };
}