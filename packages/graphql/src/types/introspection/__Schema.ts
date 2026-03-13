import { __Type, __Directive } from "./index.js";

export type __Schema = {
    description?: string | null | undefined;
    types: __Type[];
    queryType: __Type;
    mutationType?: __Type | null | undefined;
    subscriptionType?: __Type | null | undefined;
    directives?: __Directive[] | null | undefined;
}