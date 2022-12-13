import { type Sort, type __Field, __TypeKind, Operator } from "./";
import { TypeManager } from './TypeManager';

const manager = new TypeManager();

export type __FieldFilter = {
    opr?: Operator;
    val: unknown;
    sort?: Sort;
}

export type StringFilter = {
    opr?: Operator;
    val: string | null | undefined | (string | null | undefined)[];
    sort?: Sort;
}

export type NumberFilter = {
    opr?: Operator;
    val: unknown;
    sort?: Sort;
}

export type BooleanFilter = {
    opr?: Operator;
    val: unknown;
    sort?: Sort;
}

export const createFilter = (__field: __Field): __FieldFilter => {
    if (manager.getFieldTypeKind(__field.type) === __TypeKind.OBJECT) {
        return { val: undefined };
    }
    return { opr: Operator.EQ, val: undefined, sort: undefined };
}

export const addFilter = (__field: __Field, opr: Operator, val: unknown): __FieldFilter => {
    return { opr, val, sort: undefined };
}