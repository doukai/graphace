import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { GraphacePluginConfig } from './config.js';
import { assertEnumType, assertScalarType, isEnumType, isInputObjectType, isListType, isNonNullType, isObjectType, isScalarType, type GraphQLEnumValue, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType, type GraphQLSchema } from 'graphql';
import { Liquid } from 'liquidjs';
import * as changeCase from "change-case";

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const connectionSuffix = "Connection";
const edgeSuffix = "Edge";

const engine = new Liquid({
    root: `${__dirname}/../templates`,
    extname: '.liquid'
})

engine.registerFilter('camelCase', (v: string) => changeCase.camelCase(v));
engine.registerFilter('capitalCase', (v: string) => changeCase.capitalCase(v));
engine.registerFilter('constantCase', (v: string) => changeCase.constantCase(v));
engine.registerFilter('dotCase', (v: string) => changeCase.dotCase(v));
engine.registerFilter('headerCase', (v: string) => changeCase.headerCase(v));
engine.registerFilter('noCase', (v: string) => changeCase.noCase(v));
engine.registerFilter('paramCase', (v: string) => changeCase.paramCase(v));
engine.registerFilter('pascalCase', (v: string) => changeCase.pascalCase(v));
engine.registerFilter('pathCase', (v: string) => changeCase.pathCase(v));
engine.registerFilter('sentenceCase', (v: string) => changeCase.sentenceCase(v));
engine.registerFilter('snakeCase', (v: string) => changeCase.snakeCase(v));


const isConnection = (fieldName?: string): boolean => { return fieldName?.slice(-connectionSuffix.length) === connectionSuffix };
const isEdge = (fieldName?: string): boolean => { return fieldName?.slice(-edgeSuffix.length) === edgeSuffix };
const isAggregate = (fieldName?: string): boolean => { return aggregateSuffix.some(suffix => fieldName?.slice(-suffix.length) === suffix) };

const getFieldType = (type: GraphQLOutputType): GraphQLOutputType => {
    if (isListType(type) || isNonNullType(type)) {
        return getFieldType(type.ofType);
    }
    return type;
}

const getScalarFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
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

const getScalarNames = (type: GraphQLNamedType): string[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const scalarNames = Object.values(type.getFields())
            .map(field => getFieldType(field.type))
            .filter(type => isScalarType(type))
            .map(type => assertScalarType(type))
            .map(type => type.name);
        return scalarNames.filter((scalarName, index) => scalarNames.indexOf(scalarName) == index);
    }
    return undefined;
}

const getEnumNames = (type: GraphQLNamedType): string[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const enumNames = Object.values(type.getFields())
            .map(field => getFieldType(field.type))
            .filter(type => isEnumType(type))
            .map(type => assertEnumType(type))
            .map(type => type.name);
        return enumNames.filter((enumName, index) => enumNames.indexOf(enumName) == index);
    }
    return undefined;
}

const getIDFieldName = (type: GraphQLOutputType): string | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        const idField = Object.values(type.getFields())
            .filter(field => isScalarType(getFieldType(field.type)))
            .find(field => assertScalarType(getFieldType(field.type)).name === 'ID')
        return idField?.name;
    }
    return undefined;
}

const getFields = (schema: GraphQLSchema, type: GraphQLNamedType): { fieldName: string, fieldType: GraphQLOutputType, isScalarType: boolean, isEnumType: boolean, inQueryArgs: boolean, inMutationArgs: boolean }[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return Object.values(type.getFields())
            .filter(field => !isAggregate(field.name))
            .map(field => {
                return {
                    fieldName: field.name,
                    fieldType: getFieldType(field.type),
                    isScalarType: isScalarType(getFieldType(field.type)),
                    isEnumType: isEnumType(getFieldType(field.type)),
                    isNonNullType: isNonNullType(field.type),
                    isListType: isListType(field.type),
                    inQueryArgs: fieldInQueryArgs(schema, type.name, field.name),
                    inMutationArgs: fieldInMutationArgs(schema, type.name, field.name)
                }
            })
    }
    return undefined;
}

const fieldInQueryArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getQueryType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args?.some(arg => arg.name === fieldName)
    }
    return false;
}

const fieldInMutationArgs = (schema: GraphQLSchema, typeName: string, fieldName: string): boolean => {
    const operationField = schema.getMutationType()?.getFields()[changeCase.camelCase(typeName)];
    if (operationField) {
        return operationField.args?.some(arg => arg.name === fieldName)
    }
    return false;
}

const getEnumValues = (type: GraphQLNamedType): GraphQLEnumValue[] | undefined => {
    if (isEnumType(type)) {
        return Object.values(type.getValues());
    }
    return undefined;
}

export type Template = "query" |
    "mutation" |
    "typeTable" |
    'typeForm' |
    'typeCreateForm' |
    'pageSvelte' |
    'pageTs' |
    'pageEditSvelte' |
    'pageEditTs' |
    'pageCreateSvelte' |
    'pageCreateTs' |
    'enumTh' |
    'enumTd' |
    'enumItem';

type Render = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => Types.ComplexPluginOutput

const renders: Record<Template, Render> = {
    query: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getQueryType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.query?.fieldName);
            if (field) {
                return {
                    content: engine.renderFileSync(config.template, { name: field?.name, args: field?.args, isConnection: isConnection(field.name), fields: getScalarFields(field) }),
                };
            }

        }
        throw new Error(`${config.query?.fieldName} not exist in QueryType`);
    },
    mutation: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getMutationType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.mutation?.fieldName);
            if (field) {
                return {
                    content: engine.renderFileSync(config.template, { name: field?.name, args: field?.args, update: config.mutation?.update, fields: getScalarFields(field) }),
                };
            }

        }
        throw new Error(`${config.mutation?.fieldName} not exist in MutationType`);
    },
    typeTable: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.typeTable?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), fields: getFields(schema, type), schemaTypesPath: config.schemaTypesPath || 'lib/types/schema', enumsPath: `${config.typeTable?.componentsPath}/enums` }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    typeForm: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.typeForm?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), fields: getFields(schema, type), schemaTypesPath: config.schemaTypesPath || 'lib/types/schema', enumsPath: `${config.typeForm?.componentsPath}/enums` }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    typeCreateForm: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.typeCreateForm?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), fields: getFields(schema, type), schemaTypesPath: config.schemaTypesPath || 'lib/types/schema', enumsPath: `${config.typeCreateForm?.componentsPath}/enums` }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageSvelte: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageSvelte?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, tablePath: `${config.pageSvelte?.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath || 'lib/types/schema' }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageTs: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageTs?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageEditSvelte: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageEditSvelte?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, formPath: `${config.pageEditSvelte?.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath || 'lib/types/schema' }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageEditTs: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageEditTs?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageCreateSvelte: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageCreateSvelte?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, formPath: `${config.pageCreateSvelte?.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath || 'lib/types/schema' }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    pageCreateTs: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.pageCreateTs?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    enumTh: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.enumTh?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    enumTd: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.enumTd?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    },
    enumItem: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.enumItem?.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: engine.renderFileSync(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
                };
            }
        }
        throw new Error(`${typeName} not exist`);
    }
}

export const plugin: PluginFunction<GraphacePluginConfig, Types.ComplexPluginOutput> = (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: GraphacePluginConfig
) => {
    return renders[config.template](schema, documents, config);
};