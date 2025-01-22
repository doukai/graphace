import type { __DirectiveLocation, __InputValue } from "./";

export type __Directive = {
    name: string;
    description?: string | null | undefined;
    locations: __DirectiveLocation[];
    args: __InputValue[];
}