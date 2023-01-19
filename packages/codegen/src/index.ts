import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { TypeScriptPluginConfig } from './config.js';
import { isListType, isNonNullType, isObjectType, type GraphQLField, type GraphQLOutputType, type GraphQLSchema } from 'graphql';
import { Liquid } from 'liquidjs'

const engine = new Liquid({
    root: `${__dirname}/../templates`,
    extname: '.liquid'
})

const isConnection = (fieldName?: string): boolean => { return fieldName?.slice(-connectionSuffix.length) === connectionSuffix };

const getFieldType = (type: GraphQLOutputType): GraphQLOutputType => {
    if (isListType(type) || isNonNullType(type)) {
        return getFieldType(type.ofType);
    }
    return type;
}

const getScalarFields = (field?: GraphQLField<any, any, any>): GraphQLField<any, any, any>[] | undefined => {
    if (field?.type) {
        const fieldType = getFieldType(field.type);
        if (isConnection(field?.name)) {
            if (isObjectType(fieldType)) {
                const edgesType = getFieldType(fieldType.getFields().edges.type);
                if (isObjectType(edgesType)) {
                    const nodeType = getFieldType(edgesType.getFields().node.type);
                    if (isObjectType(nodeType)) {
                        return Object.values(nodeType.getFields())
                            .filter(field => !isObjectType(getFieldType(field.type)))
                            .filter(field => !aggregateSuffix.some(suffix => field.name.slice(-suffix.length) === suffix));
                    }
                }
            }
        } else {
            if (isObjectType(fieldType)) {
                return Object.values(fieldType.getFields())
                    .filter(field => !isObjectType(getFieldType(field.type)))
                    .filter(field => !aggregateSuffix.some(suffix => field.name.slice(-suffix.length) === suffix));
            }
        }
    }
    return undefined;
}

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const connectionSuffix = "Connection";

export const plugin: PluginFunction<TypeScriptPluginConfig, Types.ComplexPluginOutput> = (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: TypeScriptPluginConfig
) => {

    const operationFields = schema.getQueryType()?.getFields();
    if (operationFields) {
        const field = Object.keys(operationFields)
            .map(key => operationFields[key])
            .find(field => field.name === config.fieldName);
        if (field) {
            return {
                content: engine.renderFileSync('query', { name: field?.name, args: field?.args, isConnection: isConnection(field.name), fields: getScalarFields(field) }),
            };
        }

    }
    throw new Error(`${config.fieldName} not exist in QueryType`);
};