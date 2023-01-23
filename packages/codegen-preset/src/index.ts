import type { Types } from "@graphql-codegen/plugin-helpers";
import { isObjectType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";

const connectionSuffix = "Connection";
const edgeSuffix = "Edge";
const introspectionPrefix = "__";

const isConnection = (fieldName?: string): boolean => { return fieldName?.slice(-connectionSuffix.length) === connectionSuffix };
const isEdge = (fieldName?: string): boolean => { return fieldName?.slice(-edgeSuffix.length) === edgeSuffix };
const isIntrospection = (fieldName?: string): boolean | undefined => { return fieldName?.startsWith(introspectionPrefix) };

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];
        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isConnection(type.name))
            .filter(type => !isEdge(type.name))
            .filter(type => !isIntrospection(type.name))
            .filter(type => isObjectType(type));

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
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/objects/${changeCase.paramCase(type.name)}/${type.name}Table.svelte`,
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

        const typeFormList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/objects/${changeCase.paramCase(type.name)}/${type.name}Form.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'typeForm',
                        typeForm: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageSvelteList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageSvelte',
                        pageSvelte: {
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageTsList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageTs',
                        pageTs: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditSvelteList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/[id]/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditSvelte',
                        pageEditSvelte: {
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditTsList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/[id]/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditTs',
                        pageEditTs: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageCreateSvelteList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/+/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageCreateSvelte',
                        pageCreateSvelte: {
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageCreateTsList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(type.name)}/+/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageCreateTs',
                        pageCreateTs: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        return [...queryList, ...mutationList, ...mutationUpdateList, ...typeTableList, ...typeFormList, ...pageSvelteList, ...pageTsList, ...pageEditSvelteList, ...pageEditTsList, ...pageCreateSvelteList, ...pageCreateTsList];
    },
};