import type { __Field } from "./__Field";
import type { __TypeKind } from "./__TypeKind";

export interface __Type {
    name: string;
    fields: __Field[];
    kind: __TypeKind;
    ofType: __Type;
    description: string;
}