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

export function inGraphQLField(typeName: string, fieldName: string, fieldTypeName: string, operationType?: 'query' | 'mutation' | 'subscription'): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig =>
            fieldConfig.inGraphQL === false ||
            (operationType === 'query' && fieldConfig.inQuery === false) ||
            (operationType === 'mutation' && fieldConfig.inMutation === false) ||
            (operationType === 'subscription' && fieldConfig.inSubscription === false) ||
            fieldConfig.ignore === true
        )
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function inListField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inList === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function inDetailField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inDetail === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function inRouteField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inRoute === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true;
}

export function isSelectField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    return (builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .find(fieldConfig => fieldConfig.name === fieldName)?.select ||
        builderConfig?.objects?.find(objectConfig => objectConfig.name === fieldTypeName)?.select ||
        false
}

export function componentFields(
    typeName: string,
    fields: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        fieldTypeIdName: string,
        isNamed: boolean,
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
    fieldTypeIdName: string,
    isNamed: boolean,
    isScalarType: boolean,
    isEnumType: boolean,
    isObjectType: boolean,
    isNonNullType: boolean,
    isListType: boolean,
    inQueryArgs: boolean,
    inMutationArgs: boolean,
    select?: boolean,
    component?: string,
    inQuery?: boolean,
    inMutation?: boolean,
    inSubscription?: boolean
}[] | undefined {
    return fields?.map(field => {
        return {
            ...field,
            select: (builderConfig?.objects || [])
                .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
                .flatMap(objectConfig => objectConfig.fields || [])
                .find(fieldConfig => fieldConfig.name === field.fieldName)?.select ||
                builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.select,
            component: field.isListType ? getFieldArrayComponent(typeName, field) : getFieldComponent(typeName, field),
            inQuery: inGraphQLField(typeName, field.fieldName, field.fieldType.name, 'query'),
            inMutation: inGraphQLField(typeName, field.fieldName, field.fieldType.name, 'mutation'),
            inSubscription: inGraphQLField(typeName, field.fieldName, field.fieldType.name, 'subscription')
        };
    });
}

export function componentFieldImports(
    typeName: string,
    fields: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
    }[] | undefined
): string[] | undefined {
    return fields?.flatMap(field => field.isListType ? getFieldArrayImport(typeName, field) || [] : getFieldImport(typeName, field) || []);
}

export function getSelectComponentFieldImports(
    typeName: string,
    fields: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
    }[] | undefined
): string[] | undefined {
    const selectTypes = fields
        ?.filter(field =>
            (builderConfig?.objects || [])
                .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
                .flatMap(objectConfig => objectConfig.fields || [])
                .find(fieldConfig => fieldConfig.name === field.fieldName)?.select ||
            builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldType.name)?.select)
        .filter(field => field.isNamed)
        .map(field => field.fieldType.name);
    if (selectTypes) {
        return Array.from(new Set(selectTypes));
    }
    return undefined;
}

export function getFieldImport(
    typeName: string,
    field: {
        fieldName: string,
        fieldType: GraphQLNamedType,
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
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
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
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
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
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
        fieldTypeIdName: string,
        isNamed: boolean,
        isScalarType: boolean,
        isEnumType: boolean,
        isObjectType: boolean,
        isNonNullType: boolean,
        isListType: boolean,
        inQueryArgs: boolean,
        inMutationArgs: boolean,
        select?: boolean
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

export function getQueryTypeName() { return builderConfig?.queryTypeName || 'Query' };

export function getMutationTypeName() { return builderConfig?.mutationTypeName || 'Mutation' };

export function getSubscriptionTypeName() { return builderConfig?.subscriptionTypeName || 'Subscription' };

export const isOperationType = (name?: string): boolean => { return [builderConfig?.queryTypeName, builderConfig?.mutationTypeName, builderConfig?.subscriptionTypeName].some(typeName => name === typeName) };