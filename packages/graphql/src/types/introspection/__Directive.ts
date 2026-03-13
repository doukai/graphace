import { __DirectiveLocation, __InputValue } from "./index.js";

export type __Directive = {
    name: string;
    description?: string | null | undefined;
    locations: __DirectiveLocation[];
    args?: __InputValue[] | null | undefined;
}