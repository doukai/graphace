import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { GraphacePluginConfig } from './config.js';
import { assertScalarType, isInputObjectType, isListType, isNonNullType, isObjectType, isScalarType, type GraphQLField, type GraphQLOutputType, type GraphQLSchema } from 'graphql';
import { Liquid } from 'liquidjs'

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const connectionSuffix = "Connection";

const engine = new Liquid({
    root: `${__dirname}/../templates`,
    extname: '.liquid'
})

const isConnection = (fieldName?: string): boolean => { return fieldName?.slice(-connectionSuffix.length) === connectionSuffix };
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

const getScalarNames = (type: GraphQLOutputType): string[] | undefined => {
    if (isObjectType(type) || isInputObjectType(type)) {
        return [
            ...new Set(Object.values(type.getFields())
                .map(field => getFieldType(field.type))
                .filter(type => isScalarType(type))
                .map(type => assertScalarType(type))
                .map(type => type.name))
        ];
    }
    return undefined;
}

export type Template = "query" | "mutation";
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
    }
}

export const plugin: PluginFunction<GraphacePluginConfig, Types.ComplexPluginOutput> = (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: GraphacePluginConfig
) => {
    return renders[config.template](schema, documents, config);
};