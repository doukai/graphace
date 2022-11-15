import type { __EnumValue, __Field, __InputValue, __TypeKind } from "./";

export type __Type = {
    kind: __TypeKind;
    name?: string;
    description?: string;
    fields?: __Field[];
    interfaces?: __Type[];
    possibleTypes?: __Type[];
    enumValues?: __EnumValue[];
    inputFields?: __InputValue[];
    ofType: __Type;
}