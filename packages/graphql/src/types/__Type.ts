import { __EnumValue, __Field, __InputValue, __Schema, __TypeKind } from "./index.js";

export class __Type {
    private kind: __TypeKind;
    private name?: string | null | undefined;
    private description?: string | null | undefined;
    private fields?: __Field[] | null | undefined;
    private interfaces?: __Type[] | null | undefined;
    private possibleTypes?: __Type[] | null | undefined;
    private enumValues?: __EnumValue[] | null | undefined;
    private inputFields?: __InputValue[] | null | undefined;
    private ofType?: __Type | null | undefined;
    constructor(__type: any) {
        this.kind = __type.kind;
        this.name = __type.name;
        this.description = __type.description;
        this.fields = __type.fields?.map((__field: any) => new __Field(__field));
        this.interfaces = __type.interfaces?.map((__interface: any) => new __Type(__interface));
        this.enumValues = __type.enumValues?.map((__enumValue: any) => new __EnumValue(__enumValue));
        this.inputFields = __type.inputFields?.map((__inputValue: any) => new __InputValue(__inputValue));
        this.ofType = __type.ofType ? new __Type(__type.ofType) : null;
    }
    public getKind = (): __TypeKind => {
        return this.kind;
    }
    public getName = (): string | null | undefined => {
        return this.name;
    }
    public getDescription = (): string | null | undefined => {
        return this.description;
    }
    public getFields = (): __Field[] | null | undefined => {
        return this.fields;
    }
    public getField = (name: string): __Field | undefined => {
        return this.fields?.find((field) => field.getName() === name);
    }
    public getIDField = (): __Field | undefined => {
        return this.fields?.find((field) => field.getType().getNamedType()?.name === 'ID');
    }
    public getInterfacess = (): __Type[] | null | undefined => {
        return this.interfaces;
    }
    public getInterfaces = (name: string): __Type | undefined => {
        return this.interfaces?.find((__interface) => __interface.name === name);
    }
    public getPossibleTypes = (): __Type[] | null | undefined => {
        return this.possibleTypes;
    }
    public getPossibleType = (name: string): __Type | undefined => {
        return this.possibleTypes?.find((possibleType) => possibleType.name === name);
    }
    public getEnumValues = (): __EnumValue[] | null | undefined => {
        return this.enumValues;
    }
    public getEnumValue = (name: string): __EnumValue | undefined => {
        return this.enumValues?.find((enumValue) => enumValue.getName() === name);
    }
    public getInputFields = (): __InputValue[] | null | undefined => {
        return this.inputFields;
    }
    public getInputField = (name: string): __InputValue | undefined => {
        return this.inputFields?.find((inputField) => inputField.getName() === name);
    }
    public getOfType = (): __Type | null | undefined => {
        return this.ofType;
    }
    public isScalar = (): boolean => {
        return this.kind === 'SCALAR' || false;
    }
    public isEnum = (): boolean => {
        return this.kind === 'ENUM' || false;
    }
    public isObject = (): boolean => {
        return this.kind === 'OBJECT' || false;
    }
    public isInputObject = (): boolean => {
        return this.kind === 'INPUT_OBJECT' || false;
    }
    public isInterface = (): boolean => {
        return this.kind === 'INTERFACE' || false;
    }
    public isUnion = (): boolean => {
        return this.kind === 'UNION' || false;
    }
    public isNonNull = (): boolean => {
        return this.kind === 'NON_NULL' || false;
    }
    public isList = (): boolean => {
        return this.kind === 'LIST' || false;
    }
    public getNamedType = (): __Type | null | undefined => {
        if (this.kind === 'LIST' || this.kind === 'NON_NULL') {
            return this.ofType?.getNamedType();
        }
        return this;
    }
    public hasList = (): boolean => {
        if (this.ofType && this.kind === 'NON_NULL') {
            return this.ofType.hasList();
        }
        return this.kind === 'LIST';
    }
}