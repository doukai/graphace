"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { isObjectType, isScalarType, isNonNullType, assertNamedType } = require("graphql/type/definition");
const helpers = require("@graphql-codegen/plugin-helpers");
const path = require("path");
const plugin = async (schema, _documents, pluginConfig) => {
    const queryFields = schema.getQueryType().getFields();
    const queries = Object.keys(queryFields)
        .map(key => queryFields[key])
        .map(field =>
            `query ${field.name.charAt(0).toUpperCase() + field.name.slice(1)}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => '$' + arg.name + ': ' + arg.type).join(', ') + ')' : ''} {
    ${field.name}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => arg.name + ': $' + arg.name).join(', ') + ')' : ''} ${getSelections(schema, field)}
}
        `);

    return queries.join('\r\n');
};

const getSelections = (schema, field) => {
    // const fieldType = schema.getType(field.type);
    // isObjectType(field.type);
    // if (isObjectType(fieldType)) {
    //     assertObjectType(fieldType);
    // }
    // isNamedType(fieldType);
    //     if (isObjectType(fieldType)) {
    //         return `{
    // ${fieldType.getFields().filter(field => isScalarType(getType(field.type))).map(field => JSON.stringify(field)).join('\r\n')}
    // }
    //         `;
    //     }
    return schema.getType(getFieldType(field.type)).getFields ? JSON.stringify(schema.getType(getFieldType(field.type)).getFields()) : '';
}

const getFieldType = (type) => {
    if (type.ofType) {
        return getFieldType(type.ofType);
    }
    return type;
}
exports.plugin = plugin;