import type { Types } from "@graphql-codegen/plugin-helpers";
import { assertObjectType, isEnumType, isListType, isNonNullType, isObjectType, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";
import { buildEngine } from 'graphace-codegen-commons'
import { isOperationType, isAggregate, isConnection, isEdge, isPageInfo, isIntrospection, isInnerEnum, getFieldType, getObjectFields } from '@graphace/graphql/Introspection'

const _graphqlPath = 'src/lib/graphql';
const _componentsPath = 'src/lib/components';
const _routesPath = 'src/routes';

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];
        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isOperationType(type.name))
            .filter(type => !isConnection(type.name))
            .filter(type => !isEdge(type.name))
            .filter(type => !isPageInfo(type.name))
            .filter(type => !isAggregate(type.name))
            .filter(type => !isIntrospection(type.name))
            .filter(type => isObjectType(type));
        const enumTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isIntrospection(type.name))
            .filter(type => !isInnerEnum(type.name))
            .filter(type => isEnumType(type));

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

        const queryObjectFieldList = Object.values(queryFields)
            .filter(field => !isListType(field.type))
            .filter(field => !isConnection(getFieldType(field.type).name))
            .flatMap(field => getObjectFields(getFieldType(field.type))?.map(objectField => { return { fieldName: field.name, objectFieldName: objectField.name } }) || [])
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/graphql'}/queries/Query_${objectField?.fieldName}_${objectField?.objectFieldName}.gql`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'query',
                        query: {
                            fieldName: objectField?.fieldName,
                            objectFieldName: objectField?.objectFieldName
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

        const mutationObjectFieldList = Object.values(mutationFields)
            .filter(field => !isListType(field.type))
            .flatMap(field => getObjectFields(getFieldType(field.type))?.map(objectField => { return { fieldName: field.name, objectFieldName: objectField.name } }) || [])
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/graphql'}/mutations/Mutation_${objectField?.fieldName}_${objectField?.objectFieldName}.gql`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'mutation',
                        mutation: {
                            fieldName: objectField?.fieldName,
                            objectFieldName: objectField?.objectFieldName
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const typeMenu = {
            filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/menu/TypeMenu.svelte`,
            documents: options.documents,
            plugins: options.plugins,
            pluginMap: options.pluginMap,
            config: {
                ...options.config,
                template: 'typeMenu',
            },
            schema: options.schema,
            schemaAst: options.schemaAst,
            skipDocumentsValidation: true,
        };

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
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const typeConnectionTableList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/objects/${changeCase.paramCase(type.name)}/${type.name}ConnectionTable.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'typeConnectionTable',
                        typeConnectionTable: {
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
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
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const typeCreateFormList = objectTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/objects/${changeCase.paramCase(type.name)}/${type.name}CreateForm.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'typeCreateForm',
                        typeCreateForm: {
                            name: type.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
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

        const pageEditObjectFieldSvelteList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => !isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/[id]/${changeCase.paramCase(objectField.field.name)}/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectFieldSvelte',
                        pageEditObjectFieldSvelte: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditObjectFieldTsList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => !isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/[id]/${changeCase.paramCase(objectField.field.name)}/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectFieldTs',
                        pageEditObjectFieldTs: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];


        const pageEditObjectFieldCreateSvelteList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => !isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/+/${changeCase.paramCase(objectField.field.name)}/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectFieldCreateSvelte',
                        pageEditObjectFieldCreateSvelte: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditObjectFieldCreateTsList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => !isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/+/${changeCase.paramCase(objectField.field.name)}/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectFieldCreateTs',
                        pageEditObjectFieldCreateTs: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditObjectListFieldSvelteList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/[id]/${changeCase.paramCase(objectField.field.name)}/+page.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectListFieldSvelte',
                        pageEditObjectListFieldSvelte: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
                            componentsPath: options.presetConfig.componentsPath || 'lib/components'
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const pageEditObjectListFieldTsList = objectTypes
            .map(type => assertObjectType(type))
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => isObjectType(getFieldType(field.type)))
                    .filter(field => !isConnection(getFieldType(field.type).name))
                    .filter(field => !isEdge(getFieldType(field.type).name))
                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                    .filter(field => isListType(field.type))
                    .map(field => { return { ofType: type, field: field } }))
            .map(objectField => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.routesPath || 'routes'}/[lang]/${changeCase.paramCase(objectField.ofType.name)}/[id]/${changeCase.paramCase(objectField.field.name)}/+page.ts`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'pageEditObjectListFieldTs',
                        pageEditObjectListFieldTs: {
                            name: objectField.ofType.name,
                            objectFieldName: objectField?.field.name,
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

        const enumThList = enumTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/enums/${changeCase.paramCase(type.name)}/${type.name}Th.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'enumTh',
                        enumTh: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const enumTdList = enumTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/enums/${changeCase.paramCase(type.name)}/${type.name}Td.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'enumTd',
                        enumTd: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        const enumItemList = enumTypes
            .map(type => {
                return {
                    filename: `${options.baseOutputDir}/${options.presetConfig.componentsPath || 'lib/components'}/enums/${changeCase.paramCase(type.name)}/${type.name}Item.svelte`,
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        template: 'enumItem',
                        enumItem: {
                            name: type.name
                        }
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }) || [];

        return [
            ...queryList,
            ...queryObjectFieldList,
            ...mutationList,
            ...mutationObjectFieldList,
            typeMenu,
            ...typeTableList,
            ...typeConnectionTableList,
            ...typeFormList,
            ...typeCreateFormList,
            ...pageSvelteList,
            ...pageTsList,
            ...pageEditSvelteList,
            ...pageEditTsList,
            ...pageEditObjectFieldSvelteList,
            ...pageEditObjectFieldTsList,
            ...pageEditObjectFieldCreateSvelteList,
            ...pageEditObjectFieldCreateTsList,
            ...pageEditObjectListFieldSvelteList,
            ...pageEditObjectListFieldTsList,
            ...pageCreateSvelteList,
            ...pageCreateTsList,
            ...enumThList,
            ...enumTdList,
            ...enumItemList
        ];
    },
};