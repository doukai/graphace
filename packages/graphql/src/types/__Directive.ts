import { __DirectiveLocation, __InputValue } from "./index.js";

export class __Directive {
    private name: string;
    private description?: string | null | undefined;
    private locations: __DirectiveLocation[];
    private args?: __InputValue[] | null | undefined;
    constructor(__directive: any) {
        this.name = __directive.name;
        this.description = __directive.description;
        this.locations = __directive.locations;
        this.args = __directive.args?.map((arg: any) => new __InputValue(arg));
    }
    public getName = (): string | null | undefined => {
        return this.name;
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getType = (): __DirectiveLocation[] => {
        return this.locations;
    }
    public getArgs = (): __InputValue[] | null | undefined => {
        return this.args;
    }
}