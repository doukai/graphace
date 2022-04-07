import type { __EnumValue } from "./__EnumValue";
import type { __Field } from "./__Field";
import type { __TypeKind } from "./__TypeKind";

export type __Type = {
    name: string;
    fields: __Field[];
    enumValues: __EnumValue[];
    kind: __TypeKind;
    ofType: __Type;
    description: string;
}