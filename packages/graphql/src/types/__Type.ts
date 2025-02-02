import type { __EnumValue, __Field, __InputValue, __TypeKind } from "./";

export class __Type {
    kind!: __TypeKind;
    name?: string | null | undefined;
    description?: string | null | undefined;
    fields?: __Field[] | null | undefined;
    interfaces?: __Type[] | null | undefined;
    possibleTypes?: __Type[] | null | undefined;
    enumValues?: __EnumValue[] | null | undefined;
    inputFields?: __InputValue[] | null | undefined;
    ofType?: __Type | null | undefined;
    public getFields = (): __Field[] | null | undefined => {
        return this.fields;
    }
    public getField = (name: string): __Field | undefined => {
        return this.fields?.find((field) => field.name === name);
    }
    public getIDField = (): __Field | undefined => {
        return this.fields?.find((field) => field.type.getNamedType()?.name === 'ID');
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
        return this.enumValues?.find((enumValue) => enumValue.name === name);
    }
    public getInputFields = (): __InputValue[] | null | undefined => {
        return this.inputFields;
    }
    public getInputField = (name: string): __InputValue | undefined => {
        return this.inputFields?.find((inputField) => inputField.name === name);
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