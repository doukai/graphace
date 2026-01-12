import * as changeCase from "change-case";
import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
    type GraphQLSchema,
    isEnumType,
    isObjectType,
    assertEnumType,
    assertObjectType
} from 'graphql';
import {
    type Template,
    initConfig,
    isOperationType,
    isConnection,
    isEdge,
    isPageInfo,
    isInnerEnum,
    isIntrospection,
    getFieldType,
    getIDFieldName,
    getEnumValues,
    inComponentEnum,
    inComponentObject,
    inRouteObject,
    isAggregate,
    getQueryFieldInfo,
    getObjectFieldInfo,
    getMutationFieldInfo,
    getObjectFieldInfos,
    getObjectInfo,
    getImportInfo
} from 'graphace-codegen-commons';
import type { GraphacePluginConfig } from './config.js';
import { buildFileContent } from "./builder.js";

type Render = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => Types.ComplexPluginOutput

const getObjectTypes = (schema: GraphQLSchema) =>
    Object.values(schema?.getTypeMap() || {})
        .filter(type => !isOperationType(type.name))
        .filter(type => !isConnection(type.name))
        .filter(type => !isEdge(type.name))
        .filter(type => !isPageInfo(type.name))
        .filter(type => !isAggregate(type.name))
        .filter(type => !isIntrospection(type.name))
        .filter(type => isObjectType(type))
        .filter(type => getIDFieldName(type))
        .map(type => assertObjectType(type))
        .map(objectType => ({
            ...objectType,
            fields: Object.values(objectType.getFields())
                .filter(field => !isEdge(getFieldType(field.type).name))
                .filter(field => !isPageInfo(getFieldType(field.type).name))
                .filter(field => !isIntrospection(getFieldType(field.type).name))
        }));

const getEnumTypes = (schema: GraphQLSchema) =>
    Object.values(schema.getTypeMap())
        .filter(type => isEnumType(type))
        .filter(type => !isIntrospection(type.name))
        .filter(type => !isInnerEnum(type.name))
        .map(type => assertEnumType(type))
        .map(enumType => ({
            ...enumType,
            values: enumType.getValues()
        }));

const buildConfig = (config: GraphacePluginConfig) => ({
    ...config
});

const renders: Record<Template, Render> = {
    '{{dataPath}}/pages.json': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: getObjectTypes(schema)
                        .filter(type => inRouteObject(type.name)),
                    ...buildConfig(config)
                }
            ),
        };
    },
    '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: getObjectTypes(schema),
                    enums: getEnumTypes(schema),
                    ...buildConfig(config)
                }
            ),
        };
    },
    '{{i18nPath}}/{{i18nDescription}}/graphql/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: getObjectTypes(schema),
                    enums: getEnumTypes(schema),
                    ...buildConfig(config)
                }
            ),
        };
    },
    '{{storesPath}}/query/query_{{name}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const queryFieldInfo = getQueryFieldInfo(schema, config.name!);
        if (queryFieldInfo) {
            return {
                content: buildFileContent(config.template, {
                    ...queryFieldInfo,
                    fields: getObjectFieldInfos(schema, queryFieldInfo.originalFieldTypeName)
                        ?.filter(field => field.inGraphQL && field.inQuery),
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/query/query_{{name}}_{{objectFieldName}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const queryFieldInfo = getQueryFieldInfo(schema, changeCase.camelCase(config.name!));
        if (queryFieldInfo) {
            const objectFieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (objectFieldInfo) {
                return {
                    content: buildFileContent(config.template, {
                        ...queryFieldInfo,
                        fields: getObjectFieldInfos(schema, queryFieldInfo.originalFieldTypeName)
                            ?.filter(field => field.inGraphQL && field.inQuery),
                        objectFieldInfo: {
                            ...objectFieldInfo,
                            fields: getObjectFieldInfos(schema, objectFieldInfo.originalFieldTypeName)
                                ?.filter(field => field.inGraphQL && field.inQuery)
                        },
                        ...config
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/mutation/mutation_{{name}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const mutationFieldInfo = getMutationFieldInfo(schema, config.name!);
        if (mutationFieldInfo) {
            return {
                content: buildFileContent(config.template, {
                    ...mutationFieldInfo,
                    fields: getObjectFieldInfos(schema, mutationFieldInfo.originalFieldTypeName)
                        ?.filter(field => field.inGraphQL && field.inMutation),
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/mutation/mutation_{{name}}_{{objectFieldName}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const mutationFieldInfo = getMutationFieldInfo(schema, changeCase.camelCase(config.name!));
        if (mutationFieldInfo) {
            const objectFieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (objectFieldInfo) {
                return {
                    content: buildFileContent(config.template, {
                        ...mutationFieldInfo,
                        fields: getObjectFieldInfos(schema, mutationFieldInfo.originalFieldTypeName)
                            ?.filter(field => field.inGraphQL && field.inMutation),
                        objectFieldInfo: {
                            ...objectFieldInfo,
                            fields: getObjectFieldInfos(schema, objectFieldInfo.originalFieldTypeName)
                                ?.filter(field => field.inGraphQL && field.inMutation)
                        },
                        ...config
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Form.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inDetail)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}FormDialog.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inDetail)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Editable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Table.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}TableDialog.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Select.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectFilter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTd.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Filter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Agg.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const aggFields = objectInfo.aggFields
                ?.filter(field => field.inList)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    aggFields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Bar.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const aggFields = objectInfo.aggFields
                ?.filter(field => field.inList)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    aggFields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Line.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const aggFields = objectInfo.aggFields
                ?.filter(field => field.inList)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    aggFields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Pie.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const aggFields = objectInfo.aggFields
                ?.filter(field => field.inList)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    aggFields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}AggTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const aggFields = objectInfo.aggFields
                ?.filter(field => field.inList)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    aggFields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => isObjectType(type))
                        .filter(type => inComponentObject(type.name))
                        .filter(type => !isOperationType(type.name))
                        .filter(type => !isConnection(type.name))
                        .filter(type => !isEdge(type.name))
                        .filter(type => !isPageInfo(type.name))
                        .filter(type => !isIntrospection(type.name))
                        .filter(type => getIDFieldName(type))
                        .map(type => assertObjectType(type))
                }
            ),
        };
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Th.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const type = schema.getType(config.name!);
        if (type && isEnumType(type)) {
            return {
                content: buildFileContent(config.template, {
                    name: type?.name,
                    enumValues: getEnumValues(type)
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Td.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const type = schema.getType(config.name!);
        if (type && isEnumType(type)) {
            return {
                content: buildFileContent(config.template, {
                    name: type?.name,
                    enumValues: getEnumValues(type)
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Input.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const type = schema.getType(config.name!);
        if (type && isEnumType(type)) {
            return {
                content: buildFileContent(config.template, {
                    name: type?.name,
                    enumValues: getEnumValues(type)
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Filter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const type = schema.getType(config.name!);
        if (type && isEnumType(type)) {
            return {
                content: buildFileContent(config.template, {
                    name: type?.name,
                    enumValues: getEnumValues(type)
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const type = schema.getType(config.name!);
        if (type && isEnumType(type)) {
            return {
                content: buildFileContent(config.template, {
                    name: type?.name,
                    enumValues: getEnumValues(type)
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/enums/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    enums: Object.values(schema.getTypeMap())
                        .filter(type => isEnumType(type))
                        .filter(type => inComponentEnum(type.name))
                        .filter(type => !isIntrospection(type.name))
                        .filter(type => !isInnerEnum(type.name))
                        .map(type => assertEnumType(type))
                }
            ),
        };
    },
    '{{routesPath}}/{{pathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fieldInfo = getObjectFieldInfo(schema, config.name!, config.objectFieldName!);
            if (fieldInfo) {
                const fieldObjectInfo = getObjectInfo(schema, fieldInfo.fieldTypeName)
                if (fieldObjectInfo) {
                    const fields = fieldObjectInfo.fields
                        ?.filter(field => field.inList)
                        .filter(field => !field.isAggregate)
                        .filter(field => !field.isConnection);
                    const importInfo = getImportInfo(fields);
                    return {
                        content: buildFileContent(config.template, {
                            ...objectInfo,
                            fieldInfo,
                            fieldObjectInfo: { ...fieldObjectInfo, fields },
                            ...importInfo,
                            ...config
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const objectInfo = getObjectInfo(schema, config.name!)
        if (objectInfo) {
            const fields = objectInfo.fields
                ?.filter(field => field.inList)
                .filter(field => !field.isAggregate)
                .filter(field => !field.isConnection);
            const importInfo = getImportInfo(fields);
            return {
                content: buildFileContent(config.template, {
                    ...objectInfo,
                    fields,
                    ...importInfo,
                    ...config
                }),
            };
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    }
}

const _schemaTypesPath = 'lib/types/schema';

export const plugin: PluginFunction<GraphacePluginConfig, Types.ComplexPluginOutput> = (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: GraphacePluginConfig
) => {
    initConfig(config.builder);
    if (!config.schemaTypesPath) {
        config.schemaTypesPath = _schemaTypesPath;
    }
    return renders[config.template](schema, documents, config);
};
