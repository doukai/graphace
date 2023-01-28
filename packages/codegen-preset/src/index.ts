import type { Types } from "@graphql-codegen/plugin-helpers";
import { isEnumType, isListType, isNonNullType, isObjectType, type GraphQLField, type GraphQLNamedType, type GraphQLOutputType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const queryTypeName = "QueryType";
const mutationTypeName = "MutationType";
const connectionSuffix = "Connection";
const edgeSuffix = "Edge";
const pageInfoName = "PageInfo";
const introspectionPrefix = "__";
const innerEnum = ["Operator", "Conditional", "Sort", "Function"];

const isOperationType = (name?: string): boolean => { return [queryTypeName, mutationTypeName].some(typeName => name === typeName) };
const isAggregate = (name?: string): boolean => { return aggregateSuffix.some(suffix => name?.slice(-suffix.length) === suffix) };
const isConnection = (name?: string): boolean => { return name?.slice(-connectionSuffix.length) === connectionSuffix };
const isEdge = (name?: string): boolean => { return name?.slice(-edgeSuffix.length) === edgeSuffix };
const isPageInfo = (name?: string): boolean => { return name === pageInfoName };
const isIntrospection = (name?: string): boolean | undefined => { return name?.startsWith(introspectionPrefix) };
const isInnerEnum = (name?: string): boolean => { return innerEnum.some(enumName => name === enumName) };

const getFieldType = (type: GraphQLOutputType): GraphQLNamedType => {
    if (isListType(type) || isNonNullType(type)) {
        return getFieldType(type.ofType);
    }
    return type;
}

const getObjectFields = (type: GraphQLNamedType): GraphQLField<any, any, any>[] | undefined => {
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

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];
        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isOperationType(type.name))
            .filter(type => !isConnection(type.name))
            .filter(type => !isEdge(type.name))
            .filter(type => !isPageInfo(type.name))
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
            .filter(field => !isListType(getFieldType(field.type)))
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
            .filter(field => !isListType(getFieldType(field.type)))
            .flatMap(field => getObjectFields(getFieldType(field.type) || [])?.map(objectField => { return { fieldName: field.name, objectFieldName: objectField.name } }) || [])
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
            ...typeFormList,
            ...typeCreateFormList,
            ...pageSvelteList,
            ...pageTsList,
            ...pageEditSvelteList,
            ...pageEditTsList,
            ...pageCreateSvelteList,
            ...pageCreateTsList,
            ...enumThList,
            ...enumTdList,
            ...enumItemList
        ];
    },
};