import { __Type, __Directive } from "./index.js";

export class __Schema {
    private description?: string | null | undefined;
    private types: __Type[];
    private queryType: __Type;
    private mutationType?: __Type | null | undefined;
    private subscriptionType?: __Type | null | undefined;
    private directives?: __Directive[] | null | undefined;
    constructor(__schema: any) {
        this.description = __schema.description;
        this.types = __schema.types.map((__type: any) => new __Type(__type));
        this.queryType = new __Type(__schema.queryType);
        this.mutationType = __schema.mutationType ? new __Type(__schema.mutationType) : null;
        this.subscriptionType = __schema.subscriptionType ? new __Type(__schema.subscriptionType) : null;
        this.directives = __schema.directives?.map((__directive: any) => new __Directive(__directive));
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getTypes = (): __Type[] => {
        return this.types;
    }
    public getType = (name: string): __Type | undefined => {
        return this.types.find((type) => type.getName() === name);
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
    public getDirectives = (): __Directive[] | null | undefined => {
        return this.directives;
    }
    public getDirective = (name: string): __Directive | null | undefined => {
        return this.directives?.find((directive) => directive.getName() === name);
    }
}