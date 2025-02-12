import * as changeCase from "change-case";
import { assertScalarType, assertObjectType, isEnumType, isInputObjectType, isListType, isNonNullType, isObjectType, isScalarType, type GraphQLEnumValue, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType, type GraphQLSchema, type GraphQLObjectType, isLeafType } from 'graphql';

export const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
export const listSuffix = "List";
export const connectionSuffix = "Connection";
export const relationSuffix = "Relation";
export const refSuffix = "Ref";
export const edgeSuffix = "Edge";
export const pageInfoName = "PageInfo";
export const introspectionPrefix = "__";
export const innerEnum = ["Operator", "Conditional", "Sort", "Func", "Protocol"];
export const namedStructInterfaceName = "NamedStruct";
export const treeStructInterfaceName = "TreeStruct";

export const isAggregate = (name?: string): boolean => { return aggregateSuffix.some(suffix => name?.slice(-suffix.length) === suffix) };
export const isConnection = (name?: string): boolean => { return name?.slice(-connectionSuffix.length) === connectionSuffix };
export const isRelation = (name?: string): boolean => { return name?.slice(-relationSuffix.length) === relationSuffix };
export const isRef = (name?: string): boolean => { return name?.slice(-refSuffix.length) === refSuffix };
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

export const fieldTypeIsNamedStruct = (type: GraphQLOutputType): boolean => {
    if (isListType(type) || isNonNullType(type)) {
        return fieldTypeIsNamedStruct(type.ofType);
    }
    return isObjectType(type) && assertObjectType(type).getInterfaces().some(interfaceType => interfaceType.name === namedStructInterfaceName) || false;
}

export const getFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields());
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields());
            }
        }
    }
    return undefined;
}

export const getLeafAndAggregateFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields())
                            .filter(field => isLeafType(getFieldType(field.type)));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => isLeafType(getFieldType(field.type)));
            }
        }
    }
    return undefined;
}

export const getLeafFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields())
                            .filter(field => isLeafType(getFieldType(field.type)))
                            .filter(field => !isAggregate(field.name));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => isLeafType(getFieldType(field.type)))
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
                            .filter(field => fieldTypeIsNamedStruct(field.type))
                            .map(field => ({ ...field, isListType: fieldTypeIsList(field.type) }));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => fieldTypeIsNamedStruct(field.type))
                    .map(field => ({ ...field, isListType: fieldTypeIsList(field.type) }));
            }
        }
    }
    return undefined;
}

export const getFileFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
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
                            .filter(field => getFieldType(field.type).name === 'File')
                            .map(field => ({ ...field, isListType: fieldTypeIsList(field.type) }));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => getFieldType(field.type).name === 'File')
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

export const getIDFieldName = (type: GraphQLNamedType): string | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const idField = Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)))
            .find(field => assertScalarType(getFieldType(field.type)).name === 'ID')
        return idField?.name;
    }
    return undefined;
}

export const getOriginalFieldName = (field: GraphQLField<any, any, any>): string | undefined => {
    const fieldName = field.name;
    for (let suffix of aggregateSuffix) {
        if (fieldName.slice(-suffix.length) === suffix) {
            return fieldName.substring(0, fieldName.lastIndexOf(suffix));
        }
    }
    return fieldName;
}

export const hasFileField = (type: GraphQLNamedType): boolean => {
    if (isObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => isObjectType(getFieldType(field.type)))
            .some(field => assertObjectType(getFieldType(field.type)).name === 'File' || assertObjectType(getFieldType(field.type)).name === 'FileConnection')
    }
    return false;
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

export const isNamedStruct = (type: GraphQLNamedType): boolean => {
    return assertObjectType(type).getInterfaces().some(interfaceType => interfaceType.name === namedStructInterfaceName);
}

export const isTreeStruct = (type: GraphQLNamedType): boolean => {
    return assertObjectType(type).getInterfaces().some(interfaceType => interfaceType.name === treeStructInterfaceName);
}