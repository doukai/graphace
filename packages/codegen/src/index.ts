import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { TypeScriptPluginConfig } from './config.js';
import type { GraphQLSchema } from 'graphql';
import { Liquid } from 'liquidjs'

const engine = new Liquid({
    root: __dirname,
    extname: '.liquid'
})

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

        return {
            content: engine.renderFileSync('query', field),
        };
    }
    throw new Error(`${config.fieldName} not exist in QueryType`);
};