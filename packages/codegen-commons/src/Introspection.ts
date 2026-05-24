import * as changeCase from "change-case";
import {
    type GraphQLSchema,
    type GraphQLNamedType,
    type GraphQLInputType,
    type GraphQLOutputType,
    type GraphQLField,
    type GraphQLEnumValue,
    assertScalarType,
    assertObjectType,
    isScalarType,
    isEnumType,
    isLeafType,
    isObjectType,
    isListType,
    isNonNullType,
    isInputObjectType
} from 'graphql';

export const inputSuffix = "Input";
export const connectionSuffix = "Connection";
export const edgeSuffix = "Edge";
export const relationSuffix = "Relation";
export const refSuffix = "Ref";
export const introspectionPrefix = "__";
export const fileTypeName = "File";
export const namedStructInterfaceName = "NamedStruct";
export const treeStructInterfaceName = "TreeStruct";

export const isConnection = (name?: string): boolean => { return name?.slice(-connectionSuffix.length) === connectionSuffix };
export const isEdge = (name?: string): boolean => { return name?.slice(-edgeSuffix.length) === edgeSuffix };
export const isRelation = (name?: string): boolean => { return name?.slice(-relationSuffix.length) === relationSuffix };
export const isRef = (name?: string): boolean => { return name?.slice(-refSuffix.length) === refSuffix };
export const isIntrospection = (name?: string): boolean | undefined => { return name?.startsWith(introspectionPrefix) };

export const getFieldType = (type: GraphQLOutputType): GraphQLNamedType => {
    if (isListType(type) || isNonNullType(type)) {
        return getFieldType(type.ofType);
    }
    return type;
}

export const getInputType = (type: GraphQLInputType): GraphQLNamedType => {
    if (isListType(type) || isNonNullType(type)) {
        return getInputType(type.ofType);
    }
    return type;
}

export const fieldTypeIsList = (type: GraphQLOutputType): boolean => {
    if (isNonNullType(type)) {
        return fieldTypeIsList(type.ofType);
    }
    return isListType(type);
}

export const inputTypeIsList = (type: GraphQLInputType): boolean => {
    if (isNonNullType(type)) {
        return inputTypeIsList(type.ofType);
    }
    return isListType(type);
}

export const fieldTypeIsNamedStruct = (type: GraphQLOutputType): boolean => {
    if (isListType(type) || isNonNullType(type)) {
        return fieldTypeIsNamedStruct(type.ofType);
    }
    return isObjectType(type) &&
        assertObjectType(type)
            .getInterfaces()
            .some(interfaceType => interfaceType.name === namedStructInterfaceName) ||
        false;
}

export const fieldTypeIsFile = (type: GraphQLOutputType): boolean => {
    if (isListType(type) || isNonNullType(type)) {
        return fieldTypeIsFile(type.ofType);
    }
    return isObjectType(type) &&
        type.name === fileTypeName ||
        false;
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

export const getLeafFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    return getFields(field)
        ?.filter(field => isLeafType(getFieldType(field.type)));
}

export const getNamedFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    return getFields(field)
        ?.filter(field => isObjectType(getFieldType(field.type)))
        .filter(field => fieldTypeIsNamedStruct(field.type));
}

export const getFileFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    return getFields(field)
        ?.filter(field => isObjectType(getFieldType(field.type)))
        .filter(field => getFieldType(field.type).name === fileTypeName);
}

export const getObjectFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    return getFields(field)
        ?.filter(field => isObjectType(getFieldType(field.type)))
        .filter(field => !isConnection(getFieldType(field.type).name))
        .filter(field => !isEdge(getFieldType(field.type).name))
        .filter(field => !isIntrospection(getFieldType(field.type).name));
}

export const getField = (type: GraphQLNamedType, fieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (isObjectType(type) && fieldName) {
        return type.getFields()[fieldName];
    }
    return undefined;
}

export const getSubField = (field: GraphQLField<any, any, any>, subFieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (field.type && subFieldName) {
        const fieldType = getFieldType(field.type);
        if (isObjectType(fieldType)) {
            return getField(fieldType, subFieldName);
        }
    }
    return undefined;
}

export const getConnectionField = (type: GraphQLNamedType | null | undefined, fieldName: string | undefined): GraphQLField<any, any, any> | undefined => {
    if (type && fieldName) {
        const connectionFieldName = `${fieldName}${connectionSuffix}`;
        if (isObjectType(type)) {
            return getField(type, connectionFieldName);
        }
    }
    return undefined;
}

export const getIDFieldName = (type: GraphQLNamedType): string | undefined => {
    if (isObjectType(type)) {
        const idField = Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)))
            .find(field => assertScalarType(getFieldType(field.type)).name === 'ID')
        return idField?.name;
    }
    return undefined;
}

export const getOriginalTypeName = (type: GraphQLNamedType): string => {
    const typeName = type.name;
    for (let suffix of [connectionSuffix, edgeSuffix]) {
        if (typeName.slice(-suffix.length) === suffix) {
            return typeName.substring(0, typeName.lastIndexOf(suffix));
        }
    }
    return typeName;
}

export const hasFileField = (type: GraphQLNamedType): boolean => {
    if (isObjectType(type)) {
        return Object.values(type.getFields())
            .map(field => getFieldType(field.type))
            .filter(fieldType => isObjectType(fieldType))
            .some(fieldType => fieldType.name === fileTypeName)
    }
    return false;
}

export const fieldInQueryArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getQueryType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args
            ?.some(arg => arg.name === fieldName);
    }
    return false;
}

export const fieldInMutationArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getMutationType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args
            ?.some(arg => arg.name === fieldName);
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
    return assertObjectType(type)
        .getInterfaces()
        .some(interfaceType => interfaceType.name === namedStructInterfaceName);
}

export const isTreeStruct = (type: GraphQLNamedType): boolean => {
    return assertObjectType(type)
        .getInterfaces()
        .some(interfaceType => interfaceType.name === treeStructInterfaceName);
}

export const typeHasInput = (schema: GraphQLSchema, typeName: string): boolean => {
    return schema.getType(typeName + inputSuffix) !== undefined;
}

export const fieldInInput = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const input = schema.getType(typeName + inputSuffix);
    if (input && isInputObjectType(input)) {
        return input.getFields()[fieldName] !== undefined;
    }
    return false;
}

export const typeInObject = (schema: GraphQLSchema, typeName: string): boolean => {
    return Object.values(schema.getTypeMap())
        .filter(type => isObjectType(type))
        .map(type => assertObjectType(type))
        .some(type => Object.values(type.getFields()).some(field => getFieldType(field.type).name === typeName));
}