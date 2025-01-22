import type { __Type, __InputValue } from "./";

export type __Field = {
    name: string;
    description?: string | null | undefined;
    args: __InputValue[]
    type: __Type;
    isDeprecated: boolean;
    deprecationReason?: string | null | undefined;
}