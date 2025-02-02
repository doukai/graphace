import type { __Type, __Directive } from "./";

export class __Schema {
    description?: string | null | undefined;
    types!: __Type[];
    queryType!: __Type;
    mutationType?: __Type | null | undefined;
    subscriptionType?: __Type | null | undefined;
    directives!: __Directive[];
    public getTypes = (): __Type[] => {
        return this.types;
    }
    public getType = (name: string): __Type | undefined => {
        return this.types.find((type) => type.name === name);
    }
    public getQueryType = (): __Type => {
        return this.queryType;
    }
    public getMutationType = (): __Type | null | undefined => {
        return this.mutationType;
    }
    public getSubscriptionType = (): __Type | null | undefined => {
        return this.subscriptionType;
    }
    public getDirectives = (): __Directive[] => {
        return this.directives;
    }
    public getDirective = (name: string): __Directive | undefined => {
        return this.directives.find((type) => type.name === name);
    }
}