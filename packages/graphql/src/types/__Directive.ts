import type { __DirectiveLocation, __InputValue } from "./";

export type __Directive = {
    name: string;
    description?: string;
    locations: __DirectiveLocation[];
    args: __InputValue[];
}