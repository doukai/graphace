import type { Types } from "@graphql-codegen/plugin-helpers";
import { assertObjectType, isEnumType, isObjectType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";
import { isOperationType, isAggregate, isConnection, isEdge, isPageInfo, isIntrospection, isInnerEnum, fieldTypeIsList, getFieldType, getObjectFields, getIDFieldName, initConfig, inGraphQLField, inComponentEnum, inComponentObject, inRouteObject, getQueryTypeName, getMutationTypeName, inRouteField, isTreeStruct, isNamedStruct } from 'graphace-codegen-commons'
import { buildPath } from "./builder";

const _appName = 'web';
const _graphqlPath = 'graphql';
const _componentsPath = 'lib/components';
const _dataPath = 'lib/data';
const _routesPath = 'routes/[lang]/(app)';
const _i18nPath = 'lib/i18n';
const _i18nDefault = 'en';

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const generateOptions: Types.GenerateOptions[] = [];
        const graphqlPath = `${options.baseOutputDir}/${options.presetConfig.graphqlPath || _graphqlPath}`;
        const componentsPath = `${options.baseOutputDir}/${options.presetConfig.componentsPath || _componentsPath}`;
        const dataPath = `${options.baseOutputDir}/${options.presetConfig.dataPath || _dataPath}`;
        const routesPath = `${options.baseOutputDir}/${options.presetConfig.routesPath || _routesPath}`;
        const i18nPath = `${options.baseOutputDir}/${options.presetConfig.i18nPath || _i18nPath}`;
        const i18nDefault = `${options.presetConfig.i18nDefault || _i18nDefault}`;
        const i18nDescription = options.presetConfig.i18nDescription;

        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];

        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];

        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isOperationType(type.name))
            .filter(type => !isConnection(type.name))
            .filter(type => !isEdge(type.name))
            .filter(type => !isPageInfo(type.name))
            .filter(type => !isAggregate(type.name))
            .filter(type => !isIntrospection(type.name))
            .filter(type => isObjectType(type))
            .filter(type => getIDFieldName(type));

        const enumTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isIntrospection(type.name))
            .filter(type => !isInnerEnum(type.name))
            .filter(type => isEnumType(type));

        initConfig(options.presetConfig.builder);

        const targetQueryFields = Object.values(queryFields)
            .filter(queryField => inGraphQLField(getQueryTypeName(), queryField.name, getFieldType(queryField.type).name));

        const targetMutationFields = Object.values(mutationFields)
            .filter(mutationField => inGraphQLField(getMutationTypeName(), mutationField.name, getFieldType(mutationField.type).name));

        const targetComponentObjectTypes = objectTypes
            .filter(type => inComponentObject(type.name));

        const targetComponentEnumTypes = enumTypes
            .filter(type => inComponentEnum(type.name));

        const targetRouteObjectType = objectTypes
            .filter(type => inRouteObject(type.name));


        const pagesTemplate = '{{dataPath}}/pages.json';
        const pageScope = { dataPath };
        generateOptions.push(
            {
                filename: buildPath(pagesTemplate, pageScope),
                documents: options.documents,
                plugins: options.plugins,
                pluginMap: options.pluginMap,
                config: {
                    appName: options.presetConfig.appName || _appName,
                    graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                    componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                    routesPath: options.presetConfig.graphqlPath || _routesPath,
                    dataPath: options.presetConfig.dataPath || _dataPath,
                    builder: options.presetConfig.builder,
                    useAuth: options.presetConfig.useAuth,
                    template: pagesTemplate,
                },
                schema: options.schema,
                schemaAst: options.schemaAst,
                skipDocumentsValidation: true,
            }
        );

        generateOptions.push(
            ...targetQueryFields
                .map(field => {
                    const template = '{{graphqlPath}}/queries/Query_{{name}}.gql';
                    const scope = { graphqlPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: field.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetQueryFields
                .filter(field => !fieldTypeIsList(field.type))
                .filter(field => !isConnection(getFieldType(field.type).name))
                .flatMap(field => {
                    const fieldType = getFieldType(field.type);
                    return getObjectFields(getFieldType(field.type))
                        ?.filter(field => inRouteField(fieldType.name, field.name, getFieldType(field.type).name))
                        ?.map(objectField => { return { name: field.name, objectFieldName: objectField.name } }) || []
                })
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{graphqlPath}}/queries/Query_{{name}}_{{objectFieldName}}.gql';
                    const scope = { graphqlPath, name, objectFieldName };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetMutationFields
                .map(field => {
                    const template = '{{graphqlPath}}/mutations/Mutation_{{name}}.gql';
                    const scope = { graphqlPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: field.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetMutationFields
                .filter(field => !fieldTypeIsList(field.type))
                .flatMap(field => {
                    const fieldType = getFieldType(field.type);
                    return getObjectFields(getFieldType(field.type))
                        ?.filter(field => inRouteField(fieldType.name, field.name, getFieldType(field.type).name))
                        ?.map(objectField => { return { name: field.name, objectFieldName: objectField.name } }) || []
                })
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{graphqlPath}}/mutations/Mutation_{{name}}_{{objectFieldName}}.gql';
                    const scope = { graphqlPath, name, objectFieldName };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/[id]/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/[id]/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => !fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => assertObjectType(type))
                .flatMap(type =>
                    Object.values(type.getFields())
                        .filter(field => isObjectType(getFieldType(field.type)))
                        .filter(field => !isConnection(getFieldType(field.type).name))
                        .filter(field => !isEdge(getFieldType(field.type).name))
                        .filter(field => !isPageInfo(getFieldType(field.type).name))
                        .filter(field => !isAggregate(field.name))
                        .filter(field => !isIntrospection(getFieldType(field.type).name))
                        .filter(field => fieldTypeIsList(field.type))
                        .filter(field => inRouteField(type.name, field.name, getFieldType(field.type).name))
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name,
                            objectFieldName
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );


        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Table.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectConnectionTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Form.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateForm.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isTreeStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeMenu.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isTreeStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeCard.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Th.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,

                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isNamedStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Select.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isNamedStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTd.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isNamedStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectItem.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Td.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Input.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            appName: options.presetConfig.appName || _appName,
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
                            builder: options.presetConfig.builder,
                            useAuth: options.presetConfig.useAuth,
                            template,
                            name: type.name
                        },
                        schema: options.schema,
                        schemaAst: options.schemaAst,
                        skipDocumentsValidation: true,
                    };
                })
        );

        const i18nTemplate = '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts';
        const i18nScope = { i18nPath, i18nDefault };
        generateOptions.push(
            {
                filename: buildPath(i18nTemplate, i18nScope),
                documents: options.documents,
                plugins: options.plugins,
                pluginMap: options.pluginMap,
                config: {
                    appName: options.presetConfig.appName || _appName,
                    graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                    componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                    routesPath: options.presetConfig.graphqlPath || _routesPath,
                    dataPath: options.presetConfig.dataPath || _dataPath,
                    i18nPath: options.presetConfig.i18nPath || _i18nPath,
                    i18nDefault: options.presetConfig.i18nDefault || _i18nDefault,
                    i18nDescription: options.presetConfig.i18nDescription,
                    builder: options.presetConfig.builder,
                    useAuth: options.presetConfig.useAuth,
                    template: i18nTemplate,
                },
                schema: options.schema,
                schemaAst: options.schemaAst,
                skipDocumentsValidation: true,
            }
        );

        if (i18nDescription && i18nDefault !== i18nDescription) {
            const i18nTemplate = '{{i18nPath}}/{{i18nDescription}}/graphql/index.ts';
            const i18nScope = { i18nPath, i18nDescription };
            generateOptions.push(
                {
                    filename: buildPath(i18nTemplate, i18nScope),
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        appName: options.presetConfig.appName || _appName,
                        graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                        componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                        routesPath: options.presetConfig.graphqlPath || _routesPath,
                        dataPath: options.presetConfig.dataPath || _dataPath,
                        i18nPath: options.presetConfig.i18nPath || _i18nPath,
                        i18nDefault: options.presetConfig.i18nDefault || _i18nDefault,
                        i18nDescription: options.presetConfig.i18nDescription,
                        builder: options.presetConfig.builder,
                        useAuth: options.presetConfig.useAuth,
                        template: i18nTemplate,
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                }
            );
        }
        return generateOptions;
    },
};