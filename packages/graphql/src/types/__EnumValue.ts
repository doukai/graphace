export class __EnumValue {
    private name: string;
    private description?: string | null | undefined;
    private isDeprecated?: boolean | null | undefined;
    private deprecationReason?: string | null | undefined;
    constructor(__enumValue: any) {
        this.name = __enumValue.name;
        this.description = __enumValue.description;
        this.isDeprecated = __enumValue.isDeprecated;
        this.deprecationReason = __enumValue.deprecationReason;
    }
    public getName = (): string | null | undefined => {
        return this.name;
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getIsDeprecated = (): boolean | null | undefined => {
        return this.isDeprecated;
    }
    public getDeprecationReason = (): string | null | undefined => {
        return this.deprecationReason;
    }
}