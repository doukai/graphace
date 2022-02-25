import * as _ from "lodash";

export interface __Type {
    name: string;
    fields: __Field[];
    kind: __TypeKind;
    ofType: __Type;
}

export interface __Field {
    name: string;
    type: __Type;
}

export enum __TypeKind {
    SCALAR = <any>"SCALAR",
    OBJECT = <any>"OBJECT",
    INTERFACE = <any>"INTERFACE",
    UNION = <any>"UNION",
    ENUM = <any>"ENUM",
    INPUT_OBJECT = <any>"INPUT_OBJECT",
    LIST = <any>"LIST",
    NON_NULL = <any>"NON_NULL",
}

export function getFieldType(type: __Type): __TypeKind {
    if (type.kind === __TypeKind.NON_NULL) {
        return getFieldType(type.ofType);
    } else if (type.kind === __TypeKind.LIST) {
        return getFieldType(type.ofType);
    } else {
        return type.kind;
    }
}

export function getQueryTypeListFieldName(typeName: string): string {
    if (typeName.startsWith("__")) {
        return "__" + _.camelCase(typeName.replace("__", "")) + "List";
    } else {
        return _.camelCase(typeName.replace("__", "")) + "List";
    }
}