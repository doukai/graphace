import { assertEnumType, assertScalarType, isEnumType, isInputObjectType, isListType, isNonNullType, isObjectType, isScalarType, type GraphQLEnumValue, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType, type GraphQLSchema } from 'graphql';

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const queryTypeName = "QueryType";
const mutationTypeName = "MutationType";
const connectionSuffix = "Connection";
const edgeSuffix = "Edge";
const pageInfoName = "PageInfo";
const introspectionPrefix = "__";
const innerEnum = ["Operator", "Conditional", "Sort", "Function"];

export const isOperationType = (name?: string): boolean => { return [queryTypeName, mutationTypeName].some(typeName => name === typeName) };
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
        const connectionFieldName = `${fieldName}Connection`;
        if (isObjectType(type)) {
            return type.getFields()[connectionFieldName];
        }
    }
    return undefined;
}

export const getScalarNames = (type: GraphQLNamedType): string[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const scalarNames = Object.values(type.getFields())
            .filter(field => !isAggregate(field.name))
            .filter(field => !isIntrospection(field.name))
            .map(field => getFieldType(field.type))
            .filter(type => isScalarType(type))
            .map(type => assertScalarType(type))
            .map(type => type.name);
        return scalarNames.filter((scalarName, index) => scalarNames.indexOf(scalarName) == index);
    }
    return undefined;
}

export const getEnumNames = (type: GraphQLNamedType): string[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const enumNames = Object.values(type.getFields())
            .filter(field => !isInnerEnum(field.name))
            .map(field => getFieldType(field.type))
            .filter(type => isEnumType(type))
            .map(type => assertEnumType(type))
            .map(type => type.name);
        return enumNames.filter((enumName, index) => enumNames.indexOf(enumName) == index);
    }
    return undefined;
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

export const getFields = (schema: GraphQLSchema, type: GraphQLNamedType): { fieldName: string, fieldType: GraphQLNamedType, isScalarType: boolean, isEnumType: boolean, inQueryArgs: boolean, inMutationArgs: boolean }[] | undefined => {
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
                    isListType: isListType(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name)
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