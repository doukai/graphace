import type { __Type, __Directive } from "./";

export type __Schema = {
    description?: string;
    types: __Type[];
    queryType: __Type;
    mutationType?: __Type;
    subscriptionType?: __Type;
    directives: __Directive[];
}