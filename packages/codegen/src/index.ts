import * as changeCase from "change-case";
import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
    type GraphQLSchema,
    isScalarType,
    isEnumType,
    isObjectType,
    isNonNullType,
    assertEnumType,
    assertObjectType
} from 'graphql';
import {
    type Template,
    initConfig,
    isOperationType,
    isConnection,
    isRelation,
    isEdge,
    isPageInfo,
    isInnerEnum,
    isNamedStruct,
    isTreeStruct,
    isIntrospection,
    fieldTypeIsList,
    hasFileField,
    getField,
    getFieldType,
    getIDFieldName,
    getPairField,
    getSubField,
    getConnectionField,
    getLeafFields,
    getFileFields,
    getNamedFields,
    getScalarNames,
    getBaseScalarNames,
    getEnumNames,
    getEnumValues,
    inGraphQLField,
    isSelectField,
    inListField,
    inDetailField,
    inComponentEnum,
    inComponentObject,
    getFieldInfos,
    getObjectNames,
    getNamedStructObjectNames,
    getQueryTypeName,
    getMutationTypeName,
    getSubscriptionTypeName,
    getTSTypeName,
    FieldInfo,
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


const getQueryField = (schema: GraphQLSchema, name: string) =>
    schema.getQueryType()?.getFields()[name];

const buildConfig = (config: GraphacePluginConfig) => ({
    ...config
});

const renders: Record<Template, Render> = {
    '{{dataPath}}/pages.json': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: getObjectTypes(schema),
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
                            fields: getObjectFieldInfos(schema, mutationFieldInfo.originalFieldTypeName)
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
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     scalars: new Set([...getScalarNames(fields) || [], 'String']),
    //                     enums: getEnumNames(fields),
    //                     objects: getObjectNames(fields),
    //                     imports: componentFieldImports(typeName, fields),
    //                     selectImports: getSelectComponentFieldImports(typeName, fields),
    //                     fields: componentFields(typeName, fields),
    //                     cols: fields?.length,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     enumsPath: `${config.componentsPath}/enums`,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     queryTypeName: getQueryTypeName(),
    //                     mutationTypeName: getMutationTypeName(),
    //                     subscriptionTypeName: getSubscriptionTypeName(),
    //                     hasFileField: hasFileField(type),
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeMenu.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     scalars: new Set([...getScalarNames(fields) || [], 'String']),
    //                     enums: getEnumNames(fields),
    //                     objects: getObjectNames(fields),
    //                     imports: componentFieldImports(typeName, fields),
    //                     fields: componentFields(typeName, fields),
    //                     cols: fields?.length,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     enumsPath: `${config.componentsPath}/enums`,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     queryTypeName: getQueryTypeName(),
    //                     mutationTypeName: getMutationTypeName(),
    //                     subscriptionTypeName: getSubscriptionTypeName(),
    //                     hasFileField: hasFileField(type),
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeCard.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     scalars: new Set([...getScalarNames(fields) || [], 'String']),
    //                     enums: getEnumNames(fields),
    //                     objects: getObjectNames(fields),
    //                     imports: componentFieldImports(typeName, fields),
    //                     fields: componentFields(typeName, fields),
    //                     cols: fields?.length,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     enumsPath: `${config.componentsPath}/enums`,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     queryTypeName: getQueryTypeName(),
    //                     mutationTypeName: getMutationTypeName(),
    //                     subscriptionTypeName: getSubscriptionTypeName(),
    //                     hasFileField: hasFileField(type),
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     isNamedStruct: type.getInterfaces().some(interfaceType => interfaceType.name === 'NamedStruct'),
    //                     idName: getIDFieldName(type),
    //                     scalars: new Set([...getScalarNames(fields) || [], 'String']),
    //                     enums: getEnumNames(fields),
    //                     imports: componentFieldImports(typeName, fields),
    //                     namedStructObjectNames: getNamedStructObjectNames(fields),
    //                     fields: componentFields(typeName, fields),
    //                     cols: fields?.length,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     enumsPath: `${config.componentsPath}/enums`,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     queryTypeName: getQueryTypeName(),
    //                     mutationTypeName: getMutationTypeName(),
    //                     subscriptionTypeName: getSubscriptionTypeName(),
    //                     hasFileField: hasFileField(type),
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectItem.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     fields: componentFields(typeName, fields),
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
    //             const nonListObjectFields = getNonListObjectFields(schema, type)
    //                 ?.filter(field => !isConnection(field.fieldName))
    //                 .filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName))
    //                 .map(field => ({ ...field, leafFieldList: field.leafFieldList?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName)) }));
    //             const listObjectFields = getListObjectFields(schema, type)
    //                 ?.filter(field => !isConnection(field.fieldName))
    //                 .filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName))
    //                 .map(field => ({ ...field, leafFieldList: field.leafFieldList?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName)) }));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     leafFields: componentFields(typeName, fields)?.filter(field => field.isLeafType),
    //                     nonListObjectFields: componentFields(typeName, nonListObjectFields),
    //                     listObjectFields: componentFields(typeName, listObjectFields),
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Agg.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
    //             const aggFields = getAggFields(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     leafFields: componentFields(typeName, fields)?.filter(field => field.isLeafType).filter(field => !field.isListType),
    //                     aggFieldList: componentFields(typeName, aggFields),
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     useAuth: config.useAuth,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Bar.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Line.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Pie.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}AggTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}AggGrid.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/{{name}}Grid.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     objectsPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/{{pathName}}/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     isNamedStruct: isNamedStruct(type),
    //                     isTreeStruct: isTreeStruct(type)
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{componentsPath}}/objects/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     return {
    //         content: buildFileContent(config.template,
    //             {
    //                 objects: Object.values(schema.getTypeMap())
    //                     .filter(type => isObjectType(type))
    //                     .filter(type => inComponentObject(type.name))
    //                     .filter(type => !isOperationType(type.name))
    //                     .filter(type => !isConnection(type.name))
    //                     .filter(type => !isEdge(type.name))
    //                     .filter(type => !isPageInfo(type.name))
    //                     .filter(type => !isIntrospection(type.name))
    //                     .filter(type => getIDFieldName(type))
    //                     .map(type => assertObjectType(type))
    //             }
    //         ),
    //     };
    // },
    // '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isEnumType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     enumValues: getEnumValues(type),
    //                     queryTypeName: getQueryTypeName(),
    //                     mutationTypeName: getMutationTypeName(),
    //                     subscriptionTypeName: getSubscriptionTypeName(),
    //                     appName: config.appName
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
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
    // '{{componentsPath}}/enums/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     return {
    //         content: buildFileContent(config.template,
    //             {
    //                 enums: Object.values(schema.getTypeMap())
    //                     .filter(type => isEnumType(type))
    //                     .filter(type => inComponentEnum(type.name))
    //                     .filter(type => !isIntrospection(type.name))
    //                     .filter(type => !isInnerEnum(type.name))
    //                     .map(type => assertEnumType(type))
    //             }
    //         ),
    //     };
    // },
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
                            fields: getObjectFieldInfos(schema, mutationFieldInfo.originalFieldTypeName)
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
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
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
                            fields: getObjectFieldInfos(schema, mutationFieldInfo.originalFieldTypeName)
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
    // '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         connectionField: connectionField,
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         isNonNullType: isNonNullType(objectField.type),
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         pairField: getPairField(type, objectField),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         connectionField: connectionField,
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         pairField: getPairField(type, objectField),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectImports(typeName),
    //                         component: getObjectComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         formPath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         pairField: getPairField(type, objectField),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         pairField: getPairField(type, objectField),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    '{{routesPath}}/{{pathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
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
    '{{routesPath}}/{{pathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
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
    // '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectImports(typeName),
    //                         component: getObjectComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         formPath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         connectionField: connectionField,
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         isNonNullType: isNonNullType(objectField.type),
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         connectionField: connectionField,
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectImports(typeName),
    //                         component: getObjectComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         formPath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(type, objectField.name);
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         imports: getObjectArrayImports(typeName),
    //                         component: getObjectArrayComponent(typeName),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
    //                         connectionField: connectionField,
    //                         tablePath: `${config.componentsPath}/objects`,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const objectField = getField(type, config.objectFieldName);
    //             if (objectField?.type) {
    //                 const objectFieldType = getFieldType(objectField.type);
    //                 const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
    //                 return {
    //                     content: buildFileContent(config.template, {
    //                         name: type?.name,
    //                         idName: getIDFieldName(type),
    //                         objectFieldName: objectField.name,
    //                         objectFieldTypeName: objectFieldType.name,
    //                         objectFieldTypeIdName: getIDFieldName(objectFieldType),
    //                         connectionField: connectionField,
    //                         schemaTypesPath: config.schemaTypesPath,
    //                         storesPath: config.storesPath,
    //                         queryTypeName: getQueryTypeName(),
    //                         mutationTypeName: getMutationTypeName(),
    //                         subscriptionTypeName: getSubscriptionTypeName(),
    //                         hasFileField: hasFileField(objectFieldType),
    //                         useAuth: config.useAuth
    //                     }),
    //                 };
    //             }
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     chartPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     storesPath: config.storesPath
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     objects: getObjectNames(fields),
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     storesPath: config.storesPath,
    //                     useAuth: config.useAuth
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     gridPath: `${config.componentsPath}/objects`,
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     storesPath: config.storesPath
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // },
    // '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
    //     const typeName = config.name;
    //     if (typeName) {
    //         const type = schema.getType(typeName);
    //         if (type && isObjectType(type)) {
    //             const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
    //             return {
    //                 content: buildFileContent(config.template, {
    //                     name: type?.name,
    //                     idName: getIDFieldName(type),
    //                     objects: getObjectNames(fields),
    //                     schemaTypesPath: config.schemaTypesPath,
    //                     storesPath: config.storesPath,
    //                     useAuth: config.useAuth
    //                 }),
    //             };
    //         }
    //     }
    //     console.error(config);
    //     throw new Error(`${typeName} undefined`);
    // }
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
