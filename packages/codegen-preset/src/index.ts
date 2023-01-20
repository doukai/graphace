import type { Types } from "@graphql-codegen/plugin-helpers";
import type { GraphacePresetConfig } from "./config";

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];

        const queryList = Object.values(queryFields)
            .map(field => {
                return {
                    filename: `${options.baseOutputDir}queries/Query_${field.name}.gql`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'query',
                        query: {
                            fieldName: field.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const mutationList = Object.values(mutationFields)
            .map(field => {
                return {
                    filename: `${options.baseOutputDir}mutations/Mutation_${field.name}.gql`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'mutation',
                        mutation: {
                            fieldName: field.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const mutationUpdateList = Object.values(mutationFields)
            .map(field => {
                return {
                    filename: `${options.baseOutputDir}mutations/Mutation_${field.name}_update.gql`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'mutation',
                        mutation: {
                            fieldName: field.name,
                            update: true
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        return [...queryList, ...mutationList, ...mutationUpdateList];
    },
};