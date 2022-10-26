import type { __EnumValue, __Field, __TypeKind } from "../../";

export type __Type = {
    name: string;
    fields: __Field[];
    enumValues: __EnumValue[];
    kind: __TypeKind;
    ofType: __Type;
    description: string;
}