import type { GraphQLNamedType } from "graphql";
import type { BuilderConfig } from "./types/types";

let builderConfig: BuilderConfig | undefined;

export function initConfig(builder: BuilderConfig | undefined) {
    builderConfig = builder;
}

export function inComponentEnum(typeName: string): boolean {
    return (builderConfig?.enums || []).find(enumConfig => enumConfig.name === typeName)?.inComponent !== false
}

export function inComponentObject(typeName: string): boolean {
    return (builderConfig?.objects || []).find(objectConfig => objectConfig.name === typeName)?.inComponent !== false
}

export function inRouteObject(typeName: string): boolean {
    return (builderConfig?.objects || []).find(objectConfig => objectConfig.name === typeName)?.inRoute !== false
}

export function inGraphQLField(typeName: string, fieldName: string): boolean {
    return !(builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])
        .filter(field => field.inGraphQL === false)
        .some(field => field.name === fieldName);
}

export function inListField(typeName: string, fieldName: string): boolean {
    return !(builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])
        .filter(field => field.inList === false)
        .some(field => field.name === fieldName);
}

export function inDetailField(typeName: string, fieldName: string): boolean {
    return !(builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])
        .filter(field => field.inDetail === false)
        .some(field => field.name === fieldName);
}

export function componentFields(
    typeName: string,
    fields: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean
    }[] | undefined
): {
    fieldName: string,
    fieldType: GraphQLNamedType,
    isScalarType: boolean,
    isEnumType: boolean,
    isObjectType: boolean,
    isNonNullType: boolean,
    isListType: boolean,
    inQueryArgs: boolean,
    inMutationArgs: boolean,
    component?: string
}[] | undefined {
    return fields?.map(field => {
        return { ...field, component: field.isListType ? getFieldArrayComponent(typeName, field) : getFieldComponent(typeName, field) };
    });
}

export function componentFieldImports(
    typeName: string,
    fields: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean
    }[] | undefined
): string[] | undefined {
    return fields?.flatMap(field => getFieldImport(typeName, field) || []);
}

export function getFieldImport(
    typeName: string,
    field: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean
    }): string[] | undefined {
    const fieldImport = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.import;
    if (fieldImport) {
        return Array.from(new Set(fieldImport));
    } else if (field.isScalarType) {
        return Array.from(new Set(builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldType.name)?.import));
    } else if (field.isEnumType) {
        return Array.from(new Set(builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldType.name)?.import));
    } else if (field.isObjectType) {
        return Array.from(new Set(builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.import));
    }
    return undefined;
}

export function getFieldComponent(typeName: string, field: {
    fieldName: string,
    fieldType: GraphQLNamedType,
    isScalarType: boolean,
    isEnumType: boolean,
    isObjectType: boolean,
    isNonNullType: boolean,
    isListType: boolean,
    inQueryArgs: boolean,
    inMutationArgs: boolean
}): string | undefined {
    const fieldComponent = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.component;
    if (fieldComponent) {
        return fieldComponent;
    } else if (field.isScalarType) {
        return builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldType.name)?.component;
    } else if (field.isEnumType) {
        return builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldType.name)?.component;
    } else if (field.isObjectType) {
        return builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.component;
    }
    return undefined;
}

export function getFieldArrayComponent(typeName: string, field: {
    fieldName: string,
    fieldType: GraphQLNamedType,
    isScalarType: boolean,
    isEnumType: boolean,
    isObjectType: boolean,
    isNonNullType: boolean,
    isListType: boolean,
    inQueryArgs: boolean,
    inMutationArgs: boolean
}): string | undefined {
    const fieldArrayComponent = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.arrayComponent;
    if (fieldArrayComponent) {
        return fieldArrayComponent;
    } else if (field.isScalarType) {
        return builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldType.name)?.arrayComponent;
    } else if (field.isEnumType) {
        return builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldType.name)?.arrayComponent;
    } else if (field.isObjectType) {
        return builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.arrayComponent;
    }
    return undefined;
}

