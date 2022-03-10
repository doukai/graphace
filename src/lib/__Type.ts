import type { __Field } from "./TypeManager";
import type { __TypeKind } from "./TypeManager";

export interface __Type {
    name: string;
    fields: __Field[];
    kind: __TypeKind;
    ofType: __Type;
    description: string;
}