import * as changeCase from "change-case";
import { assertEnumType, assertScalarType, isEnumType, isInputObjectType, isListType, isNonNullType, isObjectType, isScalarType, type GraphQLEnumValue, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType, type GraphQLSchema, assertObjectType, GraphQLObjectType } from 'graphql';

export const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
export const connectionSuffix = "Connection";
export const edgeSuffix = "Edge";
export const pageInfoName = "PageInfo";
export const introspectionPrefix = "__";
export const innerEnum = ["Operator", "Conditional", "Sort", "Func", "Protocol"];

export const isAggregate = (name?: string): boolean => { return aggregateSuffix.some(suffix => name?.slice(-suffix.length) === suffix) };
export const isConnection = (name?: string): boolean => { return name?.slice(-connectionSuffix.length) === connectionSuffix };
export const isEdge = (name?: string): boolean => { return name?.slice(-edgeSuffix.length) === edgeSuffix };
export const isPageInfo = (name?: string): boolean => { return name === pageInfoName };
export const isIntrospection = (name?: string): boolean | undefined => { return name?.startsWith(introspectionPrefix) };
export const isInnerEnum = (name?: string): boolean => { return innerEnum.some(enumName => name === enumName) };

export const getFieldType = (type: GraphQLOutputType): GraphQLNamedType => {
    if (isListType(type) || isNonNullType(type)) {
        return getFieldType(type.ofType);
    }
    return type;
}

export const fieldTypeIsList = (type: GraphQLOutputType): boolean => {
    if (isNonNullType(type)) {
        return fieldTypeIsList(type.ofType);
    }
    return isListType(type);
}

export const getScalarFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields())
                            .filter(field => !isObjectType(getFieldType(field.type)))
                            .filter(field => !isAggregate(field.name));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => !isObjectType(getFieldType(field.type)))
                    .filter(field => !isAggregate(field.name));
            }
        }
    }
    return undefined;
}

export const getNamedFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields())
                            .filter(field => isObjectType(getFieldType(field.type)))
                            .filter(field => !isAggregate(field.name))
                            .filter(field => assertObjectType(getFieldType(field.type)).getInterfaces().some(interfaceType => interfaceType.name === "NamedStruct"))
                            .map(field => ({ ...field, isListType: fieldTypeIsList(field.type) }));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => assertObjectType(getFieldType(field.type)).getInterfaces().some(interfaceType => interfaceType.name === "NamedStruct"))
                    .map(field => ({ ...field, isListType: fieldTypeIsList(field.type) }));
            }
        }
    }
    return undefined;
}

export const getObjectFields = (type: GraphQLNamedType): GraphQLField<any, any, any>[] | undefined => {
    if (isObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => isObjectType(getFieldType(field.type)))
            .filter(field => !isConnection(getFieldType(field.type).name))
            .filter(field => !isEdge(getFieldType(field.type).name))
            .filter(field => !isAggregate(field.name))
            .filter(field => !isPageInfo(getFieldType(field.type).name))
            .filter(field => !isIntrospection(getFieldType(field.type).name))
    }
    return undefined;
}

export const getSubField = (field: GraphQLField<any, any, any>, subFieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (field.type && subFieldName) {
        const fieldType = getFieldType(field.type);
        if (isObjectType(fieldType)) {
            return fieldType.getFields()[subFieldName];
        }
    }
    return undefined;
}

export const getField = (type: GraphQLNamedType, fieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (isObjectType(type) && fieldName) {
        return type.getFields()[fieldName];
    }
    return undefined;
}

export const getConnectionField = (type: GraphQLNamedType | null | undefined, fieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (type && fieldName) {
        const connectionFieldName = `${fieldName}${connectionSuffix}`;
        if (isObjectType(type)) {
            return type.getFields()[connectionFieldName];
        }
    }
    return undefined;
}

export const getScalarNames = (
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
): string[] | undefined => {
    const scalarNames = fields?.filter(field => !isAggregate(field.fieldName))
        .filter(field => !isIntrospection(field.fieldName))
        .map(field => field.fieldType)
        .filter(type => isScalarType(type))
        .map(type => assertScalarType(type))
        .map(type => type.name);
    return scalarNames?.filter((scalarName, index) => scalarNames.indexOf(scalarName) == index);
}

export const getBaseScalarNames = (
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
): string[] | undefined => {
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

export const getEnumNames = (
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
): string[] | undefined => {
    const enumNames = fields?.filter(field => !isInnerEnum(field.fieldName))
        .map(field => field.fieldType)
        .filter(type => isEnumType(type))
        .map(type => assertEnumType(type))
        .map(type => type.name);
    return enumNames?.filter((enumName, index) => enumNames.indexOf(enumName) == index);
}

export const getObjectNames = (
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
): string[] | undefined => {
    const objectNames = fields?.map(field => field.fieldType)
        .filter(type => isObjectType(type))
        .map(type => assertObjectType(type))
        .map(type => type.name);
    return objectNames?.filter((objectName, index) => objectNames.indexOf(objectName) == index);
}

export const getIDFieldName = (type: GraphQLNamedType): string | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const idField = Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)))
            .find(field => assertScalarType(getFieldType(field.type)).name === 'ID')
        return idField?.name;
    }
    return undefined;
}

export const getPairField = (type: GraphQLObjectType, field: GraphQLField<any, any, any>): GraphQLField<any, any, any> | undefined => {
    const fieldType = getFieldType(field.type);
    if (isObjectType(fieldType)) {
        const pairField = Object.values(fieldType.getFields())
            .filter(field => !isAggregate(field.name))
            .find(field => getFieldType(field.type).name === type.name);
        return pairField;
    }
    return undefined;
}

export const getFields = (schema: GraphQLSchema, type: GraphQLNamedType): { fieldName: string, fieldType: GraphQLNamedType, isScalarType: boolean, isEnumType: boolean, isObjectType: boolean, isNonNullType: boolean, isListType: boolean, inQueryArgs: boolean, inMutationArgs: boolean }[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => !isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldType: getFieldType(field.type),
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isObjectType: isObjectType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: fieldTypeIsList(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name),
                    isNamed: isObjectType(getFieldType(field.type)) && assertObjectType(getFieldType(field.type)).getInterfaces().some(interfaceType => interfaceType.name === 'NamedStruct')
                }
            });
    }
    return undefined;
}

export const fieldInQueryArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getQueryType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args?.some(arg => arg.name === fieldName);
    }
    return false;
}

export const fieldInMutationArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getMutationType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args?.some(arg => arg.name === fieldName);
    }
    return false;
}

export const getEnumValues = (type: GraphQLNamedType): GraphQLEnumValue[] | undefined => {
    if (isEnumType(type)) {
        return Object.values(type.getValues());
    }
    return undefined;
}