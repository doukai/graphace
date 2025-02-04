import { __Type } from "./index.js";

export class __InputValue {
    private name: string;
    private description?: string | null | undefined;
    private type: __Type;
    private defaultValue?: string | null | undefined;
    constructor(__inputValue: any) {
        this.name = __inputValue.name;
        this.description = __inputValue.description;
        this.type = new __Type(__inputValue.type);
        this.defaultValue = __inputValue.defaultValue;
    }
    public getName = (): string | null | undefined => {
        return this.name;
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getType = (): __Type => {
        return this.type;
    }
    public getDefaultValue = (): string | null | undefined => {
        return this.defaultValue;
    }
}