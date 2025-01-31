

import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { GraphacePluginConfig } from './config.js';
import * as changeCase from "change-case";
import { assertObjectType, isEnumType, isObjectType, type GraphQLSchema, isNonNullType, assertEnumType, isScalarType } from 'graphql';
import { isOperationType, isConnection, isRelation, isEdge, isPageInfo, isIntrospection, getIDFieldName, getFieldType, getFields, getField, getSubField, getConnectionField, getLeafFields, getFileFields, getNamedFields, getScalarNames, getBaseScalarNames, getEnumNames, getEnumValues, initConfig, inGraphQLField, inListField, inDetailField, componentFields, getSelectComponentFieldImports, componentFieldImports, getObjectArrayImports, getObjectArrayComponent, getObjectImports, getObjectComponent, getNamedStructObjectNames, inComponentEnum, isInnerEnum, getObjectNames, getQueryTypeName, getMutationTypeName, getSubscriptionTypeName, getPairField, fieldTypeIsList, isSelectField, isNamedStruct, isTreeStruct, inComponentObject, hasFileField, getAggFields, getNonListObjectFields, getListObjectFields, getTSTypeName, getFieldInfos } from 'graphace-codegen-commons';
import type { Template } from 'graphace-codegen-commons';
import { buildFileContent } from "./builder.js";

type Render = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => Types.ComplexPluginOutput

const renders: Record<Template, Render> = {
    '{{dataPath}}/pages.json': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => !isRelation(type.name) || config.builder?.includeRelation)
                        .filter(type => isObjectType(type))
                        .filter(type => !isOperationType(type.name))
                        .filter(type => !isConnection(type.name))
                        .filter(type => !isEdge(type.name))
                        .filter(type => !isPageInfo(type.name))
                        .filter(type => !isIntrospection(type.name))
                        .filter(type => getIDFieldName(type))
                        .map(type => assertObjectType(type)),
                    useAuth: config.useAuth
                }
            ),
        };
    },
    '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    lang: config.i18nDefault,
                    i18nDescription: config.i18nDescription,
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => isObjectType(type))
                        .filter(type => !isOperationType(type.name))
                        .filter(type => !isConnection(type.name))
                        .filter(type => !isEdge(type.name))
                        .filter(type => !isPageInfo(type.name))
                        .filter(type => !isIntrospection(type.name))
                        .map(type => assertObjectType(type))
                        .map(objectType => {
                            return {
                                ...assertObjectType(objectType),
                                fields: Object.values(objectType.getFields())
                                    .filter(field => !isEdge(getFieldType(field.type).name))
                                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                            };
                        }),
                    enums: Object.values(schema.getTypeMap())
                        .filter(type => isEnumType(type))
                        .filter(type => !isIntrospection(type.name))
                        .filter(type => !isInnerEnum(type.name))
                        .map(type => assertEnumType(type))
                        .map(enumType => {
                            return {
                                ...enumType,
                                values: enumType.getValues()
                            }
                        })
                }
            ),
        };
    },
    '{{i18nPath}}/{{i18nDescription}}/graphql/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    lang: config.i18nDescription,
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => !isRelation(type.name) || config.builder?.includeRelation)
                        .filter(type => isObjectType(type))
                        .filter(type => !isOperationType(type.name))
                        .filter(type => !isConnection(type.name))
                        .filter(type => !isEdge(type.name))
                        .filter(type => !isPageInfo(type.name))
                        .filter(type => !isIntrospection(type.name))
                        .map(type => assertObjectType(type))
                        .map(objectType => {
                            return {
                                ...assertObjectType(objectType),
                                fields: Object.values(objectType.getFields())
                                    .filter(field => !isEdge(getFieldType(field.type).name))
                                    .filter(field => !isPageInfo(getFieldType(field.type).name))
                                    .filter(field => !isIntrospection(getFieldType(field.type).name))
                            };
                        }),
                    enums: Object.values(schema.getTypeMap())
                        .filter(type => inComponentEnum(type.name))
                        .filter(type => isEnumType(type))
                        .filter(type => !isIntrospection(type.name))
                        .filter(type => !isInnerEnum(type.name))
                        .map(type => assertEnumType(type))
                        .map(enumType => {
                            return {
                                ...enumType,
                                values: enumType.getValues()
                            }
                        })
                }
            ),
        };
    },
    '{{storesPath}}/query/query_{{name}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getQueryType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                return {
                    content: buildFileContent(config.template, {
                        name: field.name,
                        fieldTypeName: fieldType.name,
                        tsTypeName: getTSTypeName(fieldType.name),
                        isListType: fieldTypeIsList(field?.type),
                        isScalar: isScalarType(fieldType),
                        idName: idFieldName,
                        args: field.args,
                        isConnection: isConnection(field.name),
                        fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        fileFields: getFileFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        namedFields: getNamedFields(field)
                            ?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query'))
                            .map(field => {
                                const fieldType = getFieldType(field.type);
                                return {
                                    ...field,
                                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                                    select: isSelectField(fieldType.name, field.name, getFieldType(field.type).name),
                                    fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query'))
                                }
                            }),
                        schemaTypesPath: config.schemaTypesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/query/query_{{name}}_{{objectFieldName}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getQueryType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                let objectField = undefined;
                const subField = getSubField(field, config.objectFieldName);
                if (config.objectFieldName && subField) {
                    const subFieldType = getFieldType(subField?.type);
                    objectField = {
                        name: subField?.name,
                        fieldTypeName: subFieldType.name,
                        args: subField?.args,
                        isListType: fieldTypeIsList(subField?.type),
                        connectionField: getConnectionField(fieldType, subField?.name),
                        fields: getLeafFields(subField)?.filter(field => inGraphQLField(subFieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        fileFields: getFileFields(subField)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        namedFields: getNamedFields(subField)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query'))
                            .map(field => {
                                const fieldType = getFieldType(field.type);
                                return {
                                    ...field,
                                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                                    select: isSelectField(subFieldType.name, field.name, getFieldType(field.type).name),
                                    fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query'))
                                }
                            })
                    }
                }
                return {
                    content: buildFileContent(config.template, {
                        name: field.name,
                        fieldTypeName: fieldType.name,
                        idName: idFieldName,
                        args: field.args,
                        isConnection: isConnection(field.name),
                        fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        fileFields: getFileFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        namedFields: getNamedFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'query')),
                        objectField: objectField,
                        schemaTypesPath: config.schemaTypesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/mutation/mutation_{{name}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getMutationType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                return {
                    content: buildFileContent(config.template, {
                        name: field.name,
                        fieldTypeName: fieldType.name,
                        isListType: fieldTypeIsList(field?.type),
                        isScalar: isScalarType(fieldType),
                        tsTypeName: getTSTypeName(fieldType.name),
                        idName: idFieldName,
                        args: field.args,
                        fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        fileFields: getFileFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        namedFields: getNamedFields(field)
                            ?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation'))
                            .map(field => {
                                const fieldType = getFieldType(field.type);
                                return {
                                    ...field,
                                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                                    select: isSelectField(fieldType.name, field.name, getFieldType(field.type).name),
                                    fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation'))
                                }
                            }),
                        schemaTypesPath: config.schemaTypesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{storesPath}}/mutation/mutation_{{name}}_{{objectFieldName}}_store.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getMutationType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                let objectField = undefined;
                const subField = getSubField(field, config.objectFieldName);
                if (config.objectFieldName && subField) {
                    const subFieldType = getFieldType(subField?.type);
                    objectField = {
                        name: subField?.name,
                        fieldTypeName: subFieldType.name,
                        args: subField?.args,
                        isListType: fieldTypeIsList(subField?.type),
                        connectionField: getConnectionField(fieldType, subField?.name),
                        fields: getLeafFields(subField)?.filter(field => inGraphQLField(subFieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        fileFields: getFileFields(subField)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        namedFields: getNamedFields(subField)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation'))
                            .map(field => {
                                const fieldType = getFieldType(field.type);
                                return {
                                    ...field,
                                    fieldTypeIdName: getIDFieldName(getFieldType(field.type)) || '',
                                    select: isSelectField(subFieldType.name, field.name, getFieldType(field.type).name),
                                    fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation'))
                                }
                            })
                    }
                }
                return {
                    content: buildFileContent(config.template, {
                        name: field.name,
                        fieldTypeName: fieldType.name,
                        idName: idFieldName,
                        args: field.args,
                        fields: getLeafFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        fileFields: getFileFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        namedFields: getNamedFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name, 'mutation')),
                        objectField: objectField,
                        schemaTypesPath: config.schemaTypesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Form.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inDetailField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        selectImports: getSelectComponentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        rows: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateForm.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inDetailField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        selectImports: getSelectComponentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        rows: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Table.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        objects: getObjectNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        selectImports: getSelectComponentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        objects: getObjectNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        selectImports: getSelectComponentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectConnectionTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeMenu.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        objects: getObjectNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeCard.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        objects: getObjectNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Filter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        isNamedStruct: type.getInterfaces().some(interfaceType => interfaceType.name === 'NamedStruct'),
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        baseScalars: getBaseScalarNames(fields),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        namedStructObjectNames: getNamedStructObjectNames(fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        isNamedStruct: type.getInterfaces().some(interfaceType => interfaceType.name === 'NamedStruct'),
                        idName: getIDFieldName(type),
                        scalars: new Set([...getScalarNames(fields) || [], 'String']),
                        enums: getEnumNames(fields),
                        imports: componentFieldImports(typeName, fields),
                        namedStructObjectNames: getNamedStructObjectNames(fields),
                        fields: componentFields(typeName, fields),
                        cols: fields?.length,
                        schemaTypesPath: config.schemaTypesPath,
                        enumsPath: `${config.componentsPath}/enums`,
                        objectsPath: `${config.componentsPath}/objects`,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Select.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type);
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        fields: componentFields(typeName, fields),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectFilter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type);
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        fields: componentFields(typeName, fields),
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTd.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        fields: componentFields(typeName, fields),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectItem.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        fields: componentFields(typeName, fields),
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
                const nonListObjectFields = getNonListObjectFields(schema, type)
                    ?.filter(field => !isConnection(field.fieldName))
                    .filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName))
                    .map(field => ({ ...field, leafFieldList: field.leafFieldList?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName)) }));
                const listObjectFields = getListObjectFields(schema, type)
                    ?.filter(field => !isConnection(field.fieldName))
                    .filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName))
                    .map(field => ({ ...field, leafFieldList: field.leafFieldList?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName)) }));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        leafFields: componentFields(typeName, fields)?.filter(field => field.isLeafType).filter(field => !field.isListType),
                        nonListObjectFields: componentFields(typeName, nonListObjectFields),
                        listObjectFields: componentFields(typeName, listObjectFields),
                        schemaTypesPath: config.schemaTypesPath,
                        objectsPath: `${config.componentsPath}/objects`,
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Agg.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
                const aggFields = getAggFields(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => field.fieldName === getIDFieldName(type) || inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        leafFields: componentFields(typeName, fields)?.filter(field => field.isLeafType).filter(field => !field.isListType),
                        aggFieldList: componentFields(typeName, aggFields),
                        schemaTypesPath: config.schemaTypesPath,
                        objectsPath: `${config.componentsPath}/objects`,
                        useAuth: config.useAuth,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Bar.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Line.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Pie.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}AggTable.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}AggGrid.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Grid.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        objectsPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/objects/{{pathName}}/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        isNamedStruct: isNamedStruct(type),
                        isTreeStruct: isTreeStruct(type)
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
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
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        enumValues: getEnumValues(type),
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Th.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        enumValues: getEnumValues(type),
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Td.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        enumValues: getEnumValues(type),
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Input.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        enumValues: getEnumValues(type),
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Filter.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        enumValues: getEnumValues(type),
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        appName: config.appName
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
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
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(typeName));
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        imports: getObjectArrayImports(typeName),
                        component: getObjectArrayComponent(typeName),
                        connectionField: connectionField,
                        tablePath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(typeName));
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        connectionField: connectionField,
                        storesPath: config.storesPath,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        imports: getObjectImports(typeName),
                        component: getObjectComponent(typeName),
                        formPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        queryTypeName: getQueryTypeName(),
                        storesPath: config.storesPath,
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectImports(typeName),
                            component: getObjectComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            formPath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            isNonNullType: isNonNullType(objectField.type),
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            connectionField: connectionField,
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            isNonNullType: isNonNullType(objectField.type),
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            pairField: getPairField(type, objectField),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            connectionField: connectionField,
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            pairField: getPairField(type, objectField),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectImports(typeName),
                            component: getObjectComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            formPath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            pairField: getPairField(type, objectField),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            pairField: getPairField(type, objectField),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        imports: getObjectImports(typeName),
                        component: getObjectComponent(typeName),
                        formPath: `${config.componentsPath}/objects`,
                        storesPath: config.storesPath,
                        schemaTypesPath: config.schemaTypesPath,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath,
                        queryTypeName: getQueryTypeName(),
                        mutationTypeName: getMutationTypeName(),
                        subscriptionTypeName: getSubscriptionTypeName(),
                        hasFileField: hasFileField(type),
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectImports(typeName),
                            component: getObjectComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            formPath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            connectionField: connectionField,
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            isNonNullType: isNonNullType(objectField.type),
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            connectionField: connectionField,
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectImports(typeName),
                            component: getObjectComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            formPath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            imports: getObjectArrayImports(typeName),
                            component: getObjectArrayComponent(typeName),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            objectFieldTypeFields: getFieldInfos(schema, objectFieldType),
                            connectionField: connectionField,
                            tablePath: `${config.componentsPath}/objects`,
                            schemaTypesPath: config.schemaTypesPath,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, {
                            name: type?.name,
                            idName: getIDFieldName(type),
                            objectFieldName: objectField.name,
                            objectFieldTypeName: objectFieldType.name,
                            objectFieldTypeIdName: getIDFieldName(objectFieldType),
                            connectionField: connectionField,
                            storesPath: config.storesPath,
                            queryTypeName: getQueryTypeName(),
                            mutationTypeName: getMutationTypeName(),
                            subscriptionTypeName: getSubscriptionTypeName(),
                            hasFileField: hasFileField(objectFieldType),
                            useAuth: config.useAuth
                        }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        chartPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        objects: getObjectNames(fields),
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath,
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        gridPath: `${config.componentsPath}/objects`,
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const fields = getFieldInfos(schema, type)?.filter(field => !isConnection(field.fieldName)).filter(field => inListField(typeName, field.fieldName, field.fieldTypeName));
                return {
                    content: buildFileContent(config.template, {
                        name: type?.name,
                        idName: getIDFieldName(type),
                        objects: getObjectNames(fields),
                        schemaTypesPath: config.schemaTypesPath,
                        storesPath: config.storesPath,
                        useAuth: config.useAuth
                    }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
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