import type { __EnumValue, __Field, __InputValue, __TypeKind } from "./";

export type __Type = {
    kind: __TypeKind;
    name?: string | null | undefined;
    description?: string | null | undefined;
    fields?: __Field[] | null | undefined;
    interfaces?: __Type[] | null | undefined;
    possibleTypes?: __Type[] | null | undefined;
    enumValues?: __EnumValue[] | null | undefined;
    inputFields?: __InputValue[] | null | undefined;
    ofType?: __Type | null | undefined;
}