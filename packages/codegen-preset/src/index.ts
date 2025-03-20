import * as changeCase from "change-case";
import { assertEnumType, assertObjectType, isEnumType, isObjectType } from "graphql";
import type { Types } from "@graphql-codegen/plugin-helpers";
import {
    initConfig,
    getFieldType,
    getIDFieldName,
    getQueryTypeName,
    getMutationTypeName,
    getSubscriptionTypeName,
    isConnection,
    isAggregate,
    isEdge,
    isPageInfo,
    isNamedStruct,
    isOperationType,
    isInnerEnum,
    isIntrospection,
    fieldTypeIsList,
    inGraphQLField,
    inComponentObject,
    inComponentEnum,
    inRouteObject,
    inRouteField
} from 'graphace-codegen-commons'
import type { GraphacePresetConfig } from "./config";
import { buildPath } from "./builder";

const _appName = 'web';
const _graphqlPath = 'graphql';
const _componentsPath = 'lib/components';
const _storesPath = 'lib/stores';
const _dataPath = 'lib/data';
const _routesPath = 'routes/[lang]/(app)';
const _chartRoutesPath = 'chart';
const _gridRoutesPath = 'grid';
const _i18nPath = 'lib/i18n';
const _i18nDefault = 'en';

export const preset: Types.OutputPreset<GraphacePresetConfig> = {
    buildGeneratesSection: options => {
        initConfig(options.presetConfig.builder);
        const generateOptions: Types.GenerateOptions[] = [];
        const graphqlPath = `${options.baseOutputDir}/${options.presetConfig.graphqlPath || _graphqlPath}`;
        const componentsPath = `${options.baseOutputDir}/${options.presetConfig.componentsPath || _componentsPath}`;
        const storesPath = `${options.baseOutputDir}/${options.presetConfig.storesPath || _storesPath}`;
        const dataPath = `${options.baseOutputDir}/${options.presetConfig.dataPath || _dataPath}`;
        const routesPath = `${options.baseOutputDir}/${options.presetConfig.routesPath || _routesPath}`;
        const chartRoutesPath = options.presetConfig.chartRoutesPath || _chartRoutesPath;
        const gridRoutesPath = options.presetConfig.gridRoutesPath || _gridRoutesPath;
        const i18nPath = `${options.baseOutputDir}/${options.presetConfig.i18nPath || _i18nPath}`;
        const i18nDefault = options.presetConfig.i18nDefault || _i18nDefault;
        const i18nDescription = options.presetConfig.i18nDescription;
        const queryFields = options.schemaAst?.getQueryType()?.getFields() || [];
        const mutationFields = options.schemaAst?.getMutationType()?.getFields() || [];

        const targetQueryFields = Object.values(queryFields)
            .filter(queryField => inGraphQLField(getQueryTypeName(), queryField.name, getFieldType(queryField.type).name));

        const targetMutationFields = Object.values(mutationFields)
            .filter(mutationField => inGraphQLField(getMutationTypeName(), mutationField.name, getFieldType(mutationField.type).name));

        const objectTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isOperationType(type.name))
            .filter(type => !isConnection(type.name))
            .filter(type => !isEdge(type.name))
            .filter(type => !isPageInfo(type.name))
            .filter(type => !isAggregate(type.name))
            .filter(type => !isIntrospection(type.name))
            .filter(type => isObjectType(type))
            .filter(type => getIDFieldName(type))
            .map(type => assertObjectType(type));

        const enumTypes = Object.values(options.schemaAst?.getTypeMap() || {})
            .filter(type => !isIntrospection(type.name))
            .filter(type => !isInnerEnum(type.name))
            .filter(type => isEnumType(type))
            .map(type => assertEnumType(type));

        const targetComponentObjectTypes = objectTypes
            .filter(type => inComponentObject(type.name));

        const targetComponentEnumTypes = enumTypes
            .filter(type => inComponentEnum(type.name));

        const targetRouteObjectType = objectTypes
            .filter(type => inRouteObject(type.name));

        const targetQueryObjectTypeFields = targetRouteObjectType
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => {
                        const fieldType = getFieldType(field.type);
                        return isObjectType(fieldType) &&
                            !isEdge(fieldType.name) &&
                            !isPageInfo(fieldType.name) &&
                            !isIntrospection(fieldType.name) &&
                            inRouteField(type.name, field.name, fieldType.name)
                    })
                    .filter(field => !isAggregate(field.name))
                    .map(field => { return { name: type.name, objectFieldName: field.name } })
            );

        const targetMutationObjectTypeFields = targetRouteObjectType
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => {
                        const fieldType = getFieldType(field.type);
                        return isObjectType(fieldType) &&
                            !isConnection(fieldType.name) &&
                            !isEdge(fieldType.name) &&
                            !isPageInfo(fieldType.name) &&
                            !isIntrospection(fieldType.name) &&
                            inRouteField(type.name, field.name, fieldType.name)
                    })
                    .filter(field => !isAggregate(field.name))
                    .map(field => { return { name: type.name, objectFieldName: field.name } })
            );

        const targetRouteObjectTypeFields = targetRouteObjectType
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => {
                        const fieldType = getFieldType(field.type);
                        return isObjectType(fieldType) &&
                            !isConnection(fieldType.name) &&
                            !isEdge(fieldType.name) &&
                            !isPageInfo(fieldType.name) &&
                            !isIntrospection(fieldType.name) &&
                            inRouteField(type.name, field.name, fieldType.name)
                    })
                    .filter(field => !isAggregate(field.name))
                    .filter(field => !fieldTypeIsList(field.type))
                    .map(field => { return { name: type.name, objectFieldName: field.name } })
            );

        const targetRouteListObjectTypeFields = targetRouteObjectType
            .flatMap(type =>
                Object.values(type.getFields())
                    .filter(field => {
                        const fieldType = getFieldType(field.type);
                        return isObjectType(fieldType) &&
                            !isConnection(fieldType.name) &&
                            !isEdge(fieldType.name) &&
                            !isPageInfo(fieldType.name) &&
                            !isIntrospection(fieldType.name) &&
                            inRouteField(type.name, field.name, fieldType.name)
                    })
                    .filter(field => !isAggregate(field.name))
                    .filter(field => fieldTypeIsList(field.type))
                    .map(field => { return { name: type.name, objectFieldName: field.name } })
            );

        const _config = {
            appName: options.presetConfig.appName || _appName,
            graphqlPath: options.presetConfig.graphqlPath || _graphqlPath,
            storesPath: options.presetConfig.storesPath || _storesPath,
            componentsPath: options.presetConfig.graphqlPath || _componentsPath,
            routesPath: options.presetConfig.graphqlPath || _routesPath,
            dataPath: options.presetConfig.dataPath || _dataPath,
            i18nPath: options.presetConfig.i18nPath || _i18nPath,
            i18nDefault: options.presetConfig.i18nDefault || _i18nDefault,
            i18nDescription: options.presetConfig.i18nDescription,
            builder: options.presetConfig.builder,
            useAuth: options.presetConfig.useAuth,
            queryTypeName: getQueryTypeName(),
            mutationTypeName: getMutationTypeName(),
            subscriptionTypeName: getSubscriptionTypeName(),
        };

        const _generateOptions = {
            documents: options.documents,
            plugins: options.plugins,
            pluginMap: options.pluginMap,
            schema: options.schema,
            schemaAst: options.schemaAst,
            skipDocumentsValidation: true
        };

        const pagesTemplate = '{{dataPath}}/pages.json';
        const pageScope = { dataPath };
        generateOptions.push(
            {
                filename: buildPath(pagesTemplate, pageScope),
                config: {
                    ..._config,
                    template: pagesTemplate,
                },
                ..._generateOptions
            }
        );

        generateOptions.push(
            ...targetQueryFields
                .map(field => {
                    const template = '{{storesPath}}/query/query_{{name}}_store.ts';
                    const scope = { storesPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: field.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetQueryObjectTypeFields
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{storesPath}}/query/query_{{name}}_{{objectFieldName}}_store.ts';
                    const scope = { storesPath, name: changeCase.camelCase(name), objectFieldName };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name,
                            objectFieldName
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetMutationFields
                .map(field => {
                    const template = '{{storesPath}}/mutation/mutation_{{name}}_store.ts';
                    const scope = { storesPath, name: field.name };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: field.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetMutationObjectTypeFields
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{storesPath}}/mutation/mutation_{{name}}_{{objectFieldName}}_store.ts';
                    const scope = { storesPath, name: changeCase.camelCase(name), objectFieldName };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name,
                            objectFieldName
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .filter(type => isNamedStruct(type))
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectFilter.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetComponentObjectTypes
                .map(type => {
                    const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Filter.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions

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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Filter.svelte';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetComponentEnumTypes
                .map(type => {
                    const template = '{{componentsPath}}/enums/{{pathName}}/index.ts';
                    const scope = { componentsPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectTypeFields
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name,
                            objectFieldName
                        },
                        ..._generateOptions
                    };
                })
        );

        generateOptions.push(
            ...targetRouteObjectTypeFields
                .map(objectField => {
                    const { name, objectFieldName } = objectField;
                    const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts';
                    const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name,
                            objectFieldName
                        },
                        ..._generateOptions
                    };
                })
        );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        generateOptions.push(
            ...targetRouteObjectType
                .map(type => {
                    const template = '{{routesPath}}/{{pathName}}/_/+page.svelte';
                    const scope = { routesPath, pathName: changeCase.paramCase(type.name) };
                    return {
                        filename: buildPath(template, scope),
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
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
                        config: {
                            ..._config,
                            template,
                            name: type.name
                        },
                        ..._generateOptions
                    };
                })
        );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteListObjectTypeFields
        //         .map(objectField => {
        //             const { name, objectFieldName } = objectField;
        //             const template = '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts';
        //             const scope = { routesPath, pathName: changeCase.paramCase(name), objectListFieldPathName: changeCase.paramCase(objectFieldName) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name,
        //                     objectFieldName
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectType
        //         .map(type => {
        //             const template = '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.svelte';
        //             const scope = { routesPath, chartRoutesPath, pathName: changeCase.paramCase(type.name) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectType
        //         .map(type => {
        //             const template = '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.ts';
        //             const scope = { routesPath, chartRoutesPath, pathName: changeCase.paramCase(type.name) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectType
        //         .map(type => {
        //             const template = '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.svelte';
        //             const scope = { routesPath, gridRoutesPath, pathName: changeCase.paramCase(type.name) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetRouteObjectType
        //         .map(type => {
        //             const template = '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.ts';
        //             const scope = { routesPath, gridRoutesPath, pathName: changeCase.paramCase(type.name) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateTable.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTable.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectConnectionTable.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateForm.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .filter(type => isTreeStruct(type))
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeMenu.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .filter(type => isTreeStruct(type))
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeCard.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentEnumTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .filter(type => isNamedStruct(type))
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectItem.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Agg.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Bar.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Line.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Pie.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}AggTable.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}AggGrid.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/{{name}}Grid.svelte';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name), name: type.name };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // generateOptions.push(
        //     ...targetComponentObjectTypes
        //         .map(type => {
        //             const template = '{{componentsPath}}/objects/{{pathName}}/index.ts';
        //             const scope = { componentsPath, pathName: changeCase.paramCase(type.name) };
        //             return {
        //                 filename: buildPath(template, scope),
        //                 config: {
        //                     ..._config,
        //                     template,
        //                     name: type.name
        //                 },
        //                 ..._generateOptions
        //             };
        //         })
        // );

        // const objectIndexTemplate = '{{componentsPath}}/objects/index.ts';
        // const objectIndexScope = { componentsPath };
        // generateOptions.push(
        //     {
        //         filename: buildPath(objectIndexTemplate, objectIndexScope),
        //         config: {
        //             ..._config,
        //             template: objectIndexTemplate,
        //         },
        //         ..._generateOptions
        //     }
        // );

        // const enumIndexTemplate = '{{componentsPath}}/enums/index.ts';
        // const enumIndexScope = { componentsPath };
        // generateOptions.push(
        //     {
        //         filename: buildPath(enumIndexTemplate, enumIndexScope),
        //         config: {
        //             ..._config,
        //             template: enumIndexTemplate,
        //         },
        //         ..._generateOptions
        //     }
        // );

        // const i18nTemplate = '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts';
        // const i18nScope = { i18nPath, i18nDefault };
        // generateOptions.push(
        //     {
        //         filename: buildPath(i18nTemplate, i18nScope),
        //         config: {
        //             ..._config,
        //             template: i18nTemplate,
        //         },
        //         ..._generateOptions
        //     }
        // );

        // if (i18nDescription && i18nDefault !== i18nDescription) {
        //     const i18nTemplate = '{{i18nPath}}/{{i18nDescription}}/graphql/index.ts';
        //     const i18nScope = { i18nPath, i18nDescription };
        //     generateOptions.push(
        //         {
        //             filename: buildPath(i18nTemplate, i18nScope),
        //             config: {
        //                 ..._config,
        //                 template: i18nTemplate,
        //             },
        //             ..._generateOptions
        //         }
        //     );
        // }
        return generateOptions;
    },
};
