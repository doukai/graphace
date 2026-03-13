import { __Type, __InputValue } from "./index.js";

export type __Field = {
    name: string;
    description?: string | null | undefined;
    args: __InputValue[] | null | undefined;
    type: __Type;
    isDeprecated?: boolean | null | undefined;
    deprecationReason?: string | null | undefined;
}