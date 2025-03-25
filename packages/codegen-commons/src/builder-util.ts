import {
    type GraphQLSchema,
    type GraphQLNamedType,
    isScalarType,
    isEnumType,
    isLeafType,
    isObjectType,
    isNonNullType
} from "graphql";
import {
    connectionSuffix,
    fieldTypeIsList,
    fieldTypeIsNamedStruct,
    getFieldType,
    getIDFieldName,
    getOriginalFieldName,
    fieldInMutationArgs,
    fieldInQueryArgs,
    isAggregate,
    isInnerEnum,
    isIntrospection,
    isRelation,
    isRef,
    isConnection,
    isNamedStruct,
    fieldTypeIsFile,
    getOriginalTypeName,
    hasFileField
} from "./introspection";
import type { BuilderConfig, ObjectInfo, FieldInfo, ImportInfo } from "./types/types";

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

export function fieldIsNotIgnore(fieldName: string, fieldTypeName: string): boolean {
    const originalFieldTypeName = fieldTypeName.lastIndexOf(connectionSuffix) === -1 ?
        fieldTypeName :
        fieldTypeName.substring(0, fieldTypeName.lastIndexOf(connectionSuffix));
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === originalFieldTypeName)?.ignore !== true &&
        builderConfig?.enums?.find(enumConfig => enumConfig.name === originalFieldTypeName)?.ignore !== true &&
        (!isRelation(originalFieldTypeName) || (builderConfig?.includeRelation || false)) &&
        (!isRef(fieldName) || (builderConfig?.includeRef || false));
}

export function inGraphQLField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig =>
            fieldConfig.inGraphQL === false || fieldConfig.ignore === true
        )
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inQueryField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inQuery === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inMutationField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inMutation === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inSubscriptionField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inSubscription === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inListField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inList === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inDetailField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inDetail === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function inRouteField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    const originalTypeName = typeName.lastIndexOf(connectionSuffix) === -1 ?
        typeName :
        typeName.substring(0, typeName.lastIndexOf(connectionSuffix));
    return !(builderConfig?.objects || [])
        .filter(objectConfig => objectConfig.name === originalTypeName || objectConfig.name === 'any')
        .flatMap(objectConfig => objectConfig.fields || [])
        .filter(fieldConfig => fieldConfig.inRoute === false || fieldConfig.ignore === true)
        .some(fieldConfig => fieldConfig.name === fieldName) &&
        fieldIsNotIgnore(fieldName, fieldTypeName);
}

export function isSelectField(typeName: string, fieldName: string, fieldTypeName: string): boolean {
    return builderConfig?.objects?.find(objectConfig => objectConfig.name === fieldTypeName)?.select &&
        (builderConfig?.objects || [])
            .filter(objectConfig => objectConfig.name === typeName || objectConfig.name === 'any')
            .flatMap(objectConfig => objectConfig.fields || [])
            .find(fieldConfig => fieldConfig.name === fieldName)?.select !== false ||
        false
}

export const getObjectInfo = (schema: GraphQLSchema, name: string): ObjectInfo | undefined => {
    const type = schema.getType(name);
    if (isObjectType(type)) {
        const fields = getFieldInfos(schema, type);
        return {
            name,
            idName: getIDFieldName(type),
            hasFileField: hasFileField(type),
            isConnection: isConnection(type.name),
            isNamed: isNamedStruct(type),
            fields
        };
    }
    return undefined;
}

export const getImportInfo = (fields: FieldInfo[]): ImportInfo | undefined => {
    return {
        scalars: getScalarNames(fields),
        baseScalars: getBaseScalarNames(fields),
        enums: getEnumNames(fields),
        objects: getObjectNames(fields),
        selects: getSelectObjectNames(fields),
        nonSelects: getNonSelectObjectNames(fields)
    };
}

export const getQueryFieldInfo = (schema: GraphQLSchema, name: string): FieldInfo | undefined => {
    const field = schema.getQueryType()?.getFields()[name];
    if (field) {
        const fieldType = getFieldType(field.type);
        return {
            fieldName: field.name,
            originalFieldName: getOriginalFieldName(field),
            fieldTypeName: fieldType.name,
            originalFieldTypeName: getOriginalTypeName(fieldType),
            tsTypeName: getTSTypeName(fieldType.name),
            fieldTypeIdName: getIDFieldName(fieldType),
            args: field.args
                ?.map(arg => ({
                    inputName: arg.name,
                    inputType: arg.type.toString(),
                    defaultValue: arg.defaultValue
                })),
            isScalarType: isScalarType(fieldType),
            isEnumType: isEnumType(fieldType),
            isLeafType: isLeafType(fieldType),
            isObjectType: isObjectType(fieldType),
            isNonNullType: isNonNullType(field.type),
            isListType: fieldTypeIsList(field.type),
            isConnection: isConnection(field.name),
            isAggregate: isAggregate(field.name),
            isNamed: fieldTypeIsNamedStruct(field.type),
            isFile: fieldTypeIsFile(field.type),
            isSelect: false,
            inQueryArgs: false,
            inMutationArgs: false,
            inGraphQL: inGraphQLField(getQueryTypeName(), name, fieldType.name),
            inQuery: inQueryField(getQueryTypeName(), name, fieldType.name),
            inMutation: inMutationField(getQueryTypeName(), name, fieldType.name),
            inSubscription: inSubscriptionField(getQueryTypeName(), name, fieldType.name),
            inRoute: inRouteField(getQueryTypeName(), name, fieldType.name),
            inList: inListField(getQueryTypeName(), name, fieldType.name),
            inDetail: inDetailField(getQueryTypeName(), name, fieldType.name)
        }
    }
    return undefined;
}

export const getMutationFieldInfo = (schema: GraphQLSchema, name: string): FieldInfo | undefined => {
    const field = schema.getMutationType()?.getFields()[name];
    if (field) {
        const fieldType = getFieldType(field.type);
        return {
            fieldName: field.name,
            originalFieldName: getOriginalFieldName(field),
            fieldTypeName: fieldType.name,
            originalFieldTypeName: getOriginalTypeName(fieldType),
            tsTypeName: getTSTypeName(fieldType.name),
            fieldTypeIdName: getIDFieldName(fieldType),
            args: field.args
                ?.map(arg => ({
                    inputName: arg.name,
                    inputType: arg.type.toString(),
                    defaultValue: arg.defaultValue
                })),
            isScalarType: isScalarType(fieldType),
            isEnumType: isEnumType(fieldType),
            isLeafType: isLeafType(fieldType),
            isObjectType: isObjectType(fieldType),
            isNonNullType: isNonNullType(field.type),
            isListType: fieldTypeIsList(field.type),
            isConnection: isConnection(field.name),
            isAggregate: isAggregate(field.name),
            isNamed: fieldTypeIsNamedStruct(field.type),
            isFile: fieldTypeIsFile(field.type),
            isSelect: false,
            inQueryArgs: false,
            inMutationArgs: false,
            inGraphQL: inGraphQLField(getMutationTypeName(), name, fieldType.name),
            inQuery: inQueryField(getMutationTypeName(), name, fieldType.name),
            inMutation: inMutationField(getMutationTypeName(), name, fieldType.name),
            inSubscription: inSubscriptionField(getMutationTypeName(), name, fieldType.name),
            inRoute: inRouteField(getMutationTypeName(), name, fieldType.name),
            inList: inListField(getMutationTypeName(), name, fieldType.name),
            inDetail: inDetailField(getMutationTypeName(), name, fieldType.name)
        }
    }
    return undefined;
}

export const getObjectFieldInfos = (schema: GraphQLSchema, name: string): FieldInfo[] => {
    const type = schema.getType(name);
    if (isObjectType(type)) {
        return getFieldInfos(schema, type);
    }
    return [];
}

export const getObjectFieldInfo = (schema: GraphQLSchema, name: string, fieldName: string): FieldInfo | undefined => {
    return getObjectFieldInfos(schema, name)
        .find(fileInfo => fileInfo.fieldName === fieldName);
}

export const getFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    if (isObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => !isIntrospection(field.name))
            .map(field => {
                const fieldType = getFieldType(field.type);
                return {
                    fieldName: field.name,
                    originalFieldName: getOriginalFieldName(field),
                    fieldTypeName: fieldType.name,
                    originalFieldTypeName: getOriginalTypeName(fieldType),
                    tsTypeName: getTSTypeName(fieldType.name),
                    fieldTypeIdName: getIDFieldName(fieldType),
                    args: field.args
                        ?.map(arg => ({
                            inputName: arg.name,
                            inputType: arg.type.toString(),
                            defaultValue: arg.defaultValue
                        })),
                    isScalarType: isScalarType(fieldType),
                    isEnumType: isEnumType(fieldType),
                    isLeafType: isLeafType(fieldType),
                    isObjectType: isObjectType(fieldType),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    isAggregate: isAggregate(field.name),
                    isConnection: isConnection(field.name),
                    isNamed: fieldTypeIsNamedStruct(field.type),
                    isFile: fieldTypeIsFile(field.type),
                    isSelect: isSelectField(type.name, field.name, fieldType.name),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    inGraphQL: inGraphQLField(type.name, field.name, fieldType.name),
                    inQuery: inQueryField(type.name, field.name, fieldType.name),
                    inMutation: inMutationField(type.name, field.name, fieldType.name),
                    inSubscription: inSubscriptionField(type.name, field.name, fieldType.name),
                    inRoute: inRouteField(type.name, field.name, fieldType.name),
                    inList: inListField(type.name, field.name, fieldType.name),
                    inDetail: inDetailField(type.name, field.name, fieldType.name)
                }
            });
    }
    return [];
}

export const getNonListObjectFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field => !field.isAggregate)
        .filter(field => field.isObjectType && !field.isListType)
}

export const getListObjectFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field => !field.isAggregate)
        .filter(field => field.isObjectType && field.isListType)
}

export const getLeafFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field => !field.isAggregate)
        .filter(field => field.isLeafType)
}

export const getAggFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field =>
            field.isLeafType && field.fieldTypeName !== 'Boolean' && !field.isListType && !field.isAggregate ||
            field.isObjectType && (!field.isListType || field.isAggregate)
        )
}

export const getLeafAggFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType, originalFieldName: string): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field => field.isLeafType && field.isAggregate)
        .filter(field => field.originalFieldName === originalFieldName);
}

export const getObjectAggFieldInfos = (schema: GraphQLSchema, type: GraphQLNamedType): FieldInfo[] => {
    return getFieldInfos(schema, type)
        .filter(field => field.isLeafType && field.isAggregate);
}

export const getScalarNames = (fields: FieldInfo[] | undefined): string[] => {
    const scalarNames = fields
        ?.filter(field => !isAggregate(field.fieldName))
        .filter(field => !isIntrospection(field.fieldName))
        .filter(field => field.isScalarType)
        .map(field => field.fieldTypeName);
    if (scalarNames) {
        return Array.from(new Set(scalarNames));
    }
    return [];
}

export const getBaseScalarNames = (fields: FieldInfo[] | undefined): string[] => {
    const baseScalarNames = getScalarNames(fields)
        ?.map(typeName => {
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
                    return "Int";
                case "Float":
                case "BigDecimal":
                    return "Float";
                default:
                    return "String";
            }
        });
    if (baseScalarNames) {
        return Array.from(new Set(baseScalarNames));
    }
    return [];
}

export const getEnumNames = (fields: FieldInfo[] | undefined): string[] => {
    const enumNames = fields
        ?.filter(field => !isInnerEnum(field.fieldName))
        .filter(field => field.isEnumType)
        .map(field => field.fieldTypeName);
    if (enumNames) {
        return Array.from(new Set(enumNames));
    }
    return [];
}

export const getObjectNames = (fields: FieldInfo[] | undefined): string[] => {
    const objectNames = fields
        ?.filter(field => field.isObjectType)
        .map(field => field.fieldTypeName);
    if (objectNames) {
        return Array.from(new Set(objectNames));
    }
    return [];
}

export const getNamedStructObjectNames = (fields: FieldInfo[] | undefined): string[] => {
    const objectNames = fields
        ?.filter(field => field.isObjectType)
        .filter(field => field.isNamed)
        .map(field => field.fieldTypeName);
    if (objectNames) {
        return Array.from(new Set(objectNames));
    }
    return [];
}

export function getSelectObjectNames(fields: FieldInfo[] | undefined): string[] {
    const objectNames = fields
        ?.filter(field => field.isObjectType)
        ?.filter(field => field.isSelect)
        .filter(field => field.isNamed)
        .map(field => field.fieldTypeName);
    if (objectNames) {
        return Array.from(new Set(objectNames));
    }
    return [];
}
export function getNonSelectObjectNames(fields: FieldInfo[] | undefined): string[] {
    const objectNames = fields
        ?.filter(field => field.isObjectType)
        ?.filter(field => !field.isSelect)
        .map(field => field.fieldTypeName);
    if (objectNames) {
        return Array.from(new Set(objectNames));
    }
    return [];
}

export const getTSTypeName = (typeName: string): string => {
    switch (typeName) {
        case "Boolean":
            return "boolean";
        case "ID":
        case "String":
        case "Date":
        case "Time":
        case "DateTime":
        case "Timestamp":
            return "string";
        case "Int":
        case "BigInteger":
        case "Float":
        case "BigDecimal":
            return "number";
        default:
            return typeName;
    }
}

export function getQueryTypeName() { return builderConfig?.queryTypeName || 'Query' };

export function getMutationTypeName() { return builderConfig?.mutationTypeName || 'Mutation' };

export function getSubscriptionTypeName() { return builderConfig?.subscriptionTypeName || 'Subscription' };

export const isOperationType = (name?: string): boolean => [builderConfig?.queryTypeName, builderConfig?.mutationTypeName, builderConfig?.subscriptionTypeName].some(typeName => name === typeName);