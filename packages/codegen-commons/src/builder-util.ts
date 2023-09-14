import type { GraphQLNamedType } from "graphql";
import type { BuilderConfig } from "./types/types";
import { connectionSuffix } from "./introspection";

let builderConfig: BuilderConfig | undefined = {};

export function initConfig(builder: BuilderConfig | undefined) {
    builderConfig = { ...builder };
    if (!builderConfig.queryTypeName) {
        builderConfig.queryTypeName = 'Query';
    }
    if (!builderConfig.mutationTypeName) {
        builderConfig.mutationTypeName = 'Mutation';
    }
    if (!builderConfig.subscriptionTypeName) {
        builderConfig.subscriptionTypeName = 'Subscription';
    }
}

export function inComponentEnum(typeName: string): boolean {
    const enumConifg = builderConfig?.enums?.find(enumConfig => enumConfig.name === typeName);
    return enumConifg?.inComponent !== false && enumConifg?.ignore !== true;
}

export function inComponentObject(typeName: string): boolean {
    const objectConfig = builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName);
    return objectConfig?.inComponent !== false && objectConfig?.ignore !== true;
}

export function inRouteObject(typeName: string): boolean {
    const objectConfig = builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName);
    return objectConfig?.inRoute !== false && objectConfig?.ignore !== true;
}

export function getObjectImports(typeName: string): string[] | undefined {
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName)?.import;
}

export function getObjectArrayImports(typeName: string): string[] | undefined {
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName)?.arrayImport;
}

export function getObjectComponent(typeName: string): string | undefined {
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName)?.component;
}

export function getObjectArrayComponent(typeName: string): string | undefined {
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName)?.arrayComponent;
}

export function inGraphQLField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inGraphQL === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function inListField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inList === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function inDetailField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inDetail === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
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
    return fields?.flatMap(field => field.isListType ? getFieldArrayImport(typeName, field) || [] : getFieldImport(typeName, field) || []);
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

export function getFieldArrayImport(
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
    const fieldImport = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.arrayImport;
    if (fieldImport) {
        return Array.from(new Set(fieldImport));
    } else if (field.isScalarType) {
        return Array.from(new Set(builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldType.name)?.arrayImport));
    } else if (field.isEnumType) {
        return Array.from(new Set(builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldType.name)?.arrayImport));
    } else if (field.isObjectType) {
        return Array.from(new Set(builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.arrayImport));
    }
    return undefined;
}

export function getFieldComponent(
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

export function getFieldArrayComponent(
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

export function getQueryTypeName() { return builderConfig?.queryTypeName };

export function getMutationTypeName() { return builderConfig?.mutationTypeName };

export function getSubscriptionTypeName() { return builderConfig?.subscriptionTypeName };

export const isOperationType = (name?: string): boolean => { return [builderConfig?.queryTypeName, builderConfig?.mutationTypeName, builderConfig?.subscriptionTypeName].some(typeName => name === typeName) };