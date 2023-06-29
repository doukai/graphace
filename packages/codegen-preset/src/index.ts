import type { Types } from "@graphql-codegen/plugin-helpers";
import { assertObjectType, isEnumType, isListType, isObjectType } from "graphql";
import type { GraphacePresetConfig } from "./config";
import * as changeCase from "change-case";
import { isOperationType, isAggregate, isConnection, isEdge, isPageInfo, isIntrospection, isInnerEnum, getFieldType, getObjectFields, getIDFieldName } from 'graphace-codegen-commons'
import { buildPath } from "./Builder";

const _graphqlPath = 'lib/graphql';
const _componentsPath = 'lib/components';
const _dataPath = 'lib/data';
const _routesPath = 'routes';

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        const generateOptions: Types.GenerateOptions[] = [];
        const graphqlPath = `${options.baseOutputDir}/${options.presetConfig.graphqlPath || _graphqlPath}`;
        const componentsPath = `${options.baseOutputDir}/${options.presetConfig.componentsPath || _componentsPath}`;
        const dataPath = `${options.baseOutputDir}/${options.presetConfig.dataPath || _dataPath}`;
        const routesPath = `${options.baseOutputDir}/${options.presetConfig.routesPath || _routesPath}`;

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

        const pagesTemplate = '{{dataPath}}/pages.json';
        const pageScope = { dataPath };
        generateOptions.push(
            {
                filename: buildPath(pagesTemplate, pageScope),
                documents: options.documents,
                plugins: options.plugins,
                pluginMap: options.pluginMap,
                config: {
                    graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                    componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                    routesPath: options.presetConfig.graphqlPath || _routesPath,
                    dataPath: options.presetConfig.dataPath || _dataPath,
                    template: pagesTemplate,
                },
                schema: options.schema,
                schemaAst: options.schemaAst,
                skipDocumentsValidation: true,
            }
        );

        generateOptions.push(
            ...Object.values(queryFields)
                .filter(field => getIDFieldName(getFieldType(field.type)))
                .map(field => {
                    const template = '{{graphqlPath}}/queries/Query_{{name}}.gql';
                    const scope = { graphqlPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...Object.values(queryFields)
                .filter(field => !isListType(field.type))
                .filter(field => !isConnection(getFieldType(field.type).name))
                .filter(field => getIDFieldName(getFieldType(field.type)))
                .flatMap(field => getObjectFields(getFieldType(field.type))?.map(objectField => { return { name: field.name, objectFieldName: objectField.name } }) || [])
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
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...Object.values(mutationFields)
                .filter(field => getIDFieldName(getFieldType(field.type)))
                .map(field => {
                    const template = '{{graphqlPath}}/mutations/Mutation_{{name}}.gql';
                    const scope = { graphqlPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...Object.values(mutationFields)
                .filter(field => !isListType(field.type))
                .filter(field => getIDFieldName(getFieldType(field.type)))
                .flatMap(field => getObjectFields(getFieldType(field.type))?.map(objectField => { return { name: field.name, objectFieldName: objectField.name } }) || [])
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
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Table.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateTable.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Form.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateForm.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...enumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...enumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Th.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...enumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Td.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
                .map(type => {
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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
            ...objectTypes
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
                        .map(field => { return { name: type.name, objectFieldName: field.name } }))
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        documents: options.documents,
                        plugins: options.plugins,
                        pluginMap: options.pluginMap,
                        config: {
                            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
                            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
                            routesPath: options.presetConfig.graphqlPath || _routesPath,
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

        return generateOptions;
    },
};