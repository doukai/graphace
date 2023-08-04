import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import type { GraphacePluginConfig } from './config.js';
import * as changeCase from "change-case";
import { assertObjectType, isEnumType, isListType, isObjectType, type GraphQLSchema, isNonNullType, assertEnumType } from 'graphql';
import { isOperationType, isConnection, isEdge, isPageInfo, isIntrospection, getIDFieldName, getFieldType, getFields, getField, getSubField, getConnectionField, getScalarFields, getScalarNames, getEnumNames, getEnumValues, isAggregate, initConfig, inRouteObject, inGraphQLField, inListField, inDetailField, componentFields, componentFieldImports, getObjectArrayImports, getObjectArrayComponent, getObjectImports, getObjectComponent, inComponentEnum, isInnerEnum } from 'graphace-codegen-commons';
import type { Template } from 'graphace-codegen-commons';
import { buildFileContent } from "./builder.js";

type Render = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => Types.ComplexPluginOutput

const renders: Record<Template, Render> = {
    '{{dataPath}}/pages.json': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => inRouteObject(type.name))
                        .filter(type => isObjectType(type))
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
    '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        return {
            content: buildFileContent(config.template,
                {
                    lang: config.i18nDefault,
                    objects: Object.values(schema.getTypeMap())
                        .filter(type => inRouteObject(type.name))
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
                                    .filter(field => inListField(objectType.name, field.name, getFieldType(field.type).name) || inDetailField(objectType.name, field.name, getFieldType(field.type).name))
                                    .filter(field => !isConnection(getFieldType(field.type).name))
                                    .filter(field => !isEdge(getFieldType(field.type).name))
                                    .filter(field => !isAggregate(field.name))
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
    '{{graphqlPath}}/queries/Query_{{name}}.gql': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getQueryType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                return {
                    content: buildFileContent(config.template, { name: field.name, idName: idFieldName, args: field.args, isConnection: isConnection(field.name), fields: getScalarFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name)) }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{graphqlPath}}/queries/Query_{{name}}_{{objectFieldName}}.gql': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getQueryType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                let objectField = undefined;
                if (config.objectFieldName) {
                    const subField = getSubField(field, config.objectFieldName);
                    objectField = {
                        name: subField?.name,
                        args: subField?.args,
                        parentArgs: field.args.filter(arg => arg.name === idFieldName).map(arg => { return { name: arg.name, alias: `${field.name}_${arg.name}`, type: arg.type } }),
                        isListType: isListType(subField?.type),
                        connectionField: getConnectionField(fieldType, subField?.name),
                        fields: getScalarFields(subField),
                    }
                }
                return {
                    content: buildFileContent(config.template, { name: field.name, idName: idFieldName, args: field.args, isConnection: isConnection(field.name), fields: getScalarFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name)), objectField: objectField }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{graphqlPath}}/mutations/Mutation_{{name}}.gql': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getMutationType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                return {
                    content: buildFileContent(config.template, { name: field.name, idName: idFieldName, args: field.args, fields: getScalarFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name)) }),
                };
            }
        }
        console.error(config);
        throw new Error(`${config.name} undefined`);
    },
    '{{graphqlPath}}/mutations/Mutation_{{name}}_{{objectFieldName}}.gql': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const operationFields = schema.getMutationType()?.getFields();
        if (operationFields) {
            const field = Object.keys(operationFields)
                .map(key => operationFields[key])
                .find(field => field.name === config.name);
            if (field) {
                const fieldType = getFieldType(field.type);
                const idFieldName = getIDFieldName(fieldType);
                let objectField = undefined;
                if (config.objectFieldName) {
                    const subField = getSubField(field, config.objectFieldName);
                    objectField = {
                        name: subField?.name,
                        args: subField?.args,
                        parentArgs: field.args.filter(arg => arg.name === idFieldName).concat(field.args.filter(arg => arg.name === subField?.name)).map(arg => { return { name: arg.name, alias: `${field.name}_${arg.name}`, type: arg.type } }),
                        isListType: isListType(subField?.type),
                        connectionField: getConnectionField(fieldType, subField?.name),
                        fields: getScalarFields(subField),
                    }
                }
                return {
                    content: buildFileContent(config.template, { name: field.name, idName: idFieldName, args: field.args, fields: getScalarFields(field)?.filter(field => inGraphQLField(fieldType.name, field.name, getFieldType(field.type).name)), objectField: objectField }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), rows: getFields(schema, type)?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => field.isScalarType || field.isEnumType).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), rows: getFields(schema, type)?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => field.isScalarType || field.isEnumType).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), cols: getFields(schema, type)?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), cols: getFields(schema, type)?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), cols: getFields(schema, type)?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), cols: getFields(schema, type)?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), cols: getFields(schema, type)?.filter(field => inListField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
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
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), scalars: getScalarNames(type), enums: getEnumNames(type), imports: componentFieldImports(typeName, getFields(schema, type)), fields: componentFields(typeName, getFields(schema, type))?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => !isConnection(field.fieldName)), rows: getFields(schema, type)?.filter(field => inDetailField(typeName, field.fieldName, field.fieldType.name)).filter(field => field.isScalarType || field.isEnumType).length, schemaTypesPath: config.schemaTypesPath, enumsPath: `${config.componentsPath}/enums` }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isEnumType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
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
                    content: buildFileContent(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
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
                    content: buildFileContent(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
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
                    content: buildFileContent(config.template, { name: type?.name, enumValues: getEnumValues(type) }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(typeName));
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), connectionField: connectionField, tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(typeName));
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), connectionField: connectionField }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type) }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath, isNonNullType: isNonNullType(objectField.type) }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), connectionField: connectionField, objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath, isNonNullType: isNonNullType(objectField.type) }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), connectionField: connectionField, objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                return {
                    content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), schemaTypesPath: config.schemaTypesPath }),
                };
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), connectionField: connectionField, objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath, isNonNullType: isNonNullType(objectField.type) }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), connectionField: connectionField, objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectImports(typeName), component: getObjectComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, formPath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(type, objectField.name);
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), imports: getObjectArrayImports(typeName), component: getObjectArrayComponent(typeName), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, objectFieldTypeFields: getFields(schema, objectFieldType), connectionField: connectionField, tablePath: `${config.componentsPath}/objects`, schemaTypesPath: config.schemaTypesPath }),
                    };
                }
            }
        }
        console.error(config);
        throw new Error(`${typeName} undefined`);
    },
    '{{routesPath}}/[lang]/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts': (schema: GraphQLSchema, documents: Types.DocumentFile[], config: GraphacePluginConfig) => {
        const typeName = config.name;
        if (typeName) {
            const type = schema.getType(typeName);
            if (type && isObjectType(type)) {
                const objectField = getField(type, config.objectFieldName);
                if (objectField?.type) {
                    const objectFieldType = getFieldType(objectField.type);
                    const connectionField = getConnectionField(schema.getQueryType(), changeCase.camelCase(objectFieldType.name));
                    return {
                        content: buildFileContent(config.template, { name: type?.name, idName: getIDFieldName(type), objectFieldName: objectField.name, objectFieldTypeName: objectFieldType.name, connectionField: connectionField }),
                    };
                }
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