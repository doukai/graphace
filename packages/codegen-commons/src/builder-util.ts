import { isEnumType, isInputObjectType, isNonNullType, isObjectType, isScalarType, type GraphQLSchema, type GraphQLNamedType } from "graphql";
import type { BuilderConfig, FieldInfo } from "./types/types";
import { listSuffix, connectionSuffix, fieldInMutationArgs, fieldInQueryArgs, fieldTypeIsList, fieldTypeIsNamedStruct, getFieldType, getIDFieldName, isAggregate, isInnerEnum, isIntrospection, isRelation, getOriginalFieldName } from "./introspection";
import * as changeCase from "change-case";

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
    return objectConfig?.inComponent !== false && objectConfig?.ignore !== true && (!isRelation(typeName) || (builderConfig?.includeRelation || false));
}

export function inRouteObject(typeName: string): boolean {
    const objectConfig = builderConfig?.objects?.find(objectConfig => objectConfig.name === typeName);
    return objectConfig?.inRoute !== false && objectConfig?.ignore !== true && (!isRelation(typeName) || (builderConfig?.includeRelation || false));
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
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true &&
        (!isRelation(originalFieldTypeName) || (builderConfig?.includeRelation || false));
}

export function isInvokeField(fieldName: string, fieldTypeName: string, fieldTypeIsList: boolean): boolean {
    return fieldTypeIsList ?
        changeCase.camelCase(fieldTypeName) + listSuffix !== fieldName :
        changeCase.camelCase(fieldTypeName) !== fieldName;
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
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true &&
        (!isRelation(originalFieldTypeName) || (builderConfig?.includeRelation || false));
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
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true &&
        (!isRelation(originalFieldTypeName) || (builderConfig?.includeRelation || false));
}

export function isSelectField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    return (builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .find(fieldConfig => fieldConfig.name === fieldName)?.select ||
        builderConfig?.objects?.find(objectConfig => objectConfig.name === fieldTypeName)?.select ||
        false
}

export const getFields = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => !isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldTypeName: getFieldType(field.type).name,
                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isObjectType: isObjectType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    isNamed: fieldTypeIsNamedStruct(field.type)
                }
            });
    }
    return undefined;
}

export const getAggFields = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)) && getFieldType(field.type).name !== 'Boolean' && !fieldTypeIsList(field.type) && !isAggregate(field.name) || isObjectType(getFieldType(field.type)) && isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldTypeName: getFieldType(field.type).name,
                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isObjectType: isObjectType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    isNamed: fieldTypeIsNamedStruct(field.type),
                    originalFieldName: getOriginalFieldName(field),
                    aggFieldList: isObjectType(getFieldType(field.type)) ? getObjectAggFields(schema, getFieldType(field.type)) : getScalarAggFields(schema, type, field.name)
                }
            });
    }
    return undefined;
}

export const getScalarAggFields = (schema: GraphQLSchema, type: GraphQLNamedType, originalFieldName: string): FieldInfo[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)) && isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .filter(field => getOriginalFieldName(field) === originalFieldName)
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldTypeName: getFieldType(field.type).name,
                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isObjectType: isObjectType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    isNamed: fieldTypeIsNamedStruct(field.type),
                    originalFieldName: getOriginalFieldName(field)
                }
            });
    }
    return undefined;
}

export const getObjectAggFields = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)) && isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldTypeName: getFieldType(field.type).name,
                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isObjectType: isObjectType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    isNamed: fieldTypeIsNamedStruct(field.type),
                    originalFieldName: getOriginalFieldName(field)
                }
            });
    }
    return undefined;
}

export const getScalarNames = (fields: FieldInfo[] | undefined): string[] | undefined => {
    const scalarNames = fields?.filter(field => !isAggregate(field.fieldName))
        .filter(field => !isIntrospection(field.fieldName))
        .filter(field => field.isScalarType)
        .map(field => field.fieldTypeName);
    return scalarNames?.filter((scalarName, index) => scalarNames.indexOf(scalarName) == index);
}

export const getBaseScalarNames = (fields: FieldInfo[] | undefined): string[] | undefined => {
    const baseScalarNames = getScalarNames(fields)?.map(typeName => {
        switch (typeName) {
            case "Boolean":
                return "Boolean";
            case "ID":
            case "String":
            case "Date":
            case "Time":
            case "DateTime":
            case "Timestamp":
                return "String";
            case "Int":
            case "BigInteger":
            case "Float":
            case "BigDecimal":
                return "Number";
            default:
                return "String";
        }
    });
    return baseScalarNames?.filter((baseScalarName, index) => baseScalarNames.indexOf(baseScalarName) == index);
}

export const getEnumNames = (fields: FieldInfo[] | undefined): string[] | undefined => {
    const enumNames = fields?.filter(field => !isInnerEnum(field.fieldName))
        .filter(field => field.isEnumType)
        .map(field => field.fieldTypeName);
    return enumNames?.filter((enumName, index) => enumNames.indexOf(enumName) == index);
}

export const getObjectNames = (fields: FieldInfo[] | undefined): string[] | undefined => {
    const objectNames = fields?.filter(field => field.isObjectType)
        .map(field => field.fieldTypeName);
    return objectNames?.filter((objectName, index) => objectNames.indexOf(objectName) == index);
}

export const getNamedStructObjectNames = (fields: FieldInfo[] | undefined): string[] | undefined => {
    const objectNames = fields?.filter(field => field.isNamed)
        .map(field => field.fieldTypeName);
    return objectNames?.filter((objectName, index) => objectNames.indexOf(objectName) == index);
}

export function componentFields(typeName: string, fields: FieldInfo[] | undefined): FieldInfo[] | undefined {
    return fields?.map(field => {
        return {
            ...field,
            select: (builderConfig?.objects || [])
                .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
                .flatMap(objectConfig => objectConfig.fields || [])
                .find(fieldConfig => fieldConfig.name === field.fieldName)?.select ||
                builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.select,
            component: field.isListType ? getFieldArrayComponent(typeName, field) : getFieldComponent(typeName, field),
            inQuery: inGraphQLField(typeName, field.fieldName, field.fieldTypeName, 'query'),
            inMutation: inGraphQLField(typeName, field.fieldName, field.fieldTypeName, 'mutation'),
            inSubscription: inGraphQLField(typeName, field.fieldName, field.fieldTypeName, 'subscription')
        };
    });
}

export function componentFieldImports(typeName: string, fields: FieldInfo[] | undefined): string[] | undefined {
    return fields?.flatMap(field => field.isListType ? getFieldArrayImport(typeName, field) || [] : getFieldImport(typeName, field) || []);
}

export function getSelectComponentFieldImports(typeName: string, fields: FieldInfo[] | undefined): string[] | undefined {
    const selectTypes = fields
        ?.filter(field =>
            (builderConfig?.objects || [])
                .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
                .flatMap(objectConfig => objectConfig.fields || [])
                .find(fieldConfig => fieldConfig.name === field.fieldName)?.select ||
            builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.select)
        .filter(field => field.isNamed)
        .map(field => field.fieldTypeName);
    if (selectTypes) {
        return Array.from(new Set(selectTypes));
    }
    return undefined;
}

export function getFieldImport(typeName: string, field: FieldInfo): string[] | undefined {
    const fieldImport = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.import;
    if (fieldImport) {
        return Array.from(new Set(fieldImport));
    } else if (field.isScalarType) {
        return Array.from(new Set(builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldTypeName)?.import));
    } else if (field.isEnumType) {
        return Array.from(new Set(builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldTypeName)?.import));
    } else if (field.isObjectType) {
        return Array.from(new Set(builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.import));
    }
    return undefined;
}

export function getFieldArrayImport(typeName: string, field: FieldInfo): string[] | undefined {
    const fieldImport = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.arrayImport;
    if (fieldImport) {
        return Array.from(new Set(fieldImport));
    } else if (field.isScalarType) {
        return Array.from(new Set(builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldTypeName)?.arrayImport));
    } else if (field.isEnumType) {
        return Array.from(new Set(builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldTypeName)?.arrayImport));
    } else if (field.isObjectType) {
        return Array.from(new Set(builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.arrayImport));
    }
    return undefined;
}

export function getFieldComponent(typeName: string, field: FieldInfo): string | undefined {
    const fieldComponent = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.component;
    if (fieldComponent) {
        return fieldComponent;
    } else if (field.isScalarType) {
        return builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldTypeName)?.component;
    } else if (field.isEnumType) {
        return builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldTypeName)?.component;
    } else if (field.isObjectType) {
        return builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.component;
    }
    return undefined;
}

export function getFieldArrayComponent(typeName: string, field: FieldInfo): string | undefined {
    const fieldArrayComponent = (builderConfig?.objects || []).filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any').flatMap(objectConfig => objectConfig.fields || [])?.find(fieldConfig => fieldConfig.name === field.fieldName)?.arrayComponent;
    if (fieldArrayComponent) {
        return fieldArrayComponent;
    } else if (field.isScalarType) {
        return builderConfig?.scalars?.find(scalarConfig => scalarConfig.name === field.fieldTypeName)?.arrayComponent;
    } else if (field.isEnumType) {
        return builderConfig?.enums?.find(enumConfig => enumConfig.name === field.fieldTypeName)?.arrayComponent;
    } else if (field.isObjectType) {
        return builderConfig?.objects?.find(objectConfig => objectConfig.name === field.fieldTypeName)?.arrayComponent;
    }
    return undefined;
}

export function getQueryTypeName() { return builderConfig?.queryTypeName || 'Query' };

export function getMutationTypeName() { return builderConfig?.mutationTypeName || 'Mutation' };

export function getSubscriptionTypeName() { return builderConfig?.subscriptionTypeName || 'Subscription' };

export const isOperationType = (name?: string): boolean => { return [builderConfig?.queryTypeName, builderConfig?.mutationTypeName, builderConfig?.subscriptionTypeName].some(typeName => name === typeName) };