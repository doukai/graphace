import { __Type, __InputValue } from "./index.js";

export class __Field {
    private name: string;
    private description?: string | null | undefined;
    private args: __InputValue[] | null | undefined;
    private type: __Type;
    private isDeprecated?: boolean | null | undefined;
    private deprecationReason?: string | null | undefined;
    constructor(__field: any) {
        this.name = __field.name;
        this.description = __field.description;
        this.args = __field.args?.map((arg: any) => new __InputValue(arg));
        this.type = new __Type(__field.type);
        this.isDeprecated = __field.isDeprecated;
        this.deprecationReason = __field.deprecationReason;
    }
    public getName = (): string | null | undefined => {
        return this.name;
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getArgs = (): __InputValue[] | null | undefined => {
        return this.args;
    }
    public getType = (): __Type => {
        return this.type;
    }
    public getIsDeprecated = (): boolean | null | undefined => {
        return this.isDeprecated;
    }
    public getDeprecationReason = (): string | null | undefined => {
        return this.deprecationReason;
    }
}