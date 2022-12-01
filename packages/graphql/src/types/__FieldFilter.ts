import { type Sort, type __Field, __TypeKind, Operator } from "./";
import { TypeManager } from './TypeManager';

const manager = new TypeManager();

export type __FieldFilter = {
    __field: __Field;
    opr?: Operator;
    val: any;
    sort?: Sort;
}

export const createFilter = (__field: __Field): __FieldFilter => {
    if (manager.getFieldTypeKind(__field.type) === __TypeKind.OBJECT) {
        return { __field, val: undefined };
    }
    return { __field, opr: Operator.EQ, val: undefined, sort: undefined };
}

export const addFilter = (__field: __Field, opr: Operator, val: string | number | boolean | string[] | number[] | boolean[] | object): __FieldFilter => {
    return { __field, opr, val, sort: undefined };
}