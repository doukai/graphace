import type { Types } from "@graphql-codegen/plugin-helpers";
import { isObjectType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];
        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {}).filter(type => isObjectType(type));

        const queryList = Object.values(queryFields)
            .map(field => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/graphql'}/queries/Query_${field.name}.gql`,
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
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/graphql'}/mutations/Mutation_${field.name}.gql`,
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
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/graphql'}/mutations/Mutation_${field.name}_update.gql`,
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

        const typeTableList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/${changeCase.paramCase(type.name)}/${type.name}Table.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'typeTable',
                        typeTable: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        return [...queryList, ...mutationList, ...mutationUpdateList, ...typeTableList];
    },
};