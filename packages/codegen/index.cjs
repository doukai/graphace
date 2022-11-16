"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("@graphql-codegen/plugin-helpers");
const path = require("path");
const plugin = async (schema, _documents, pluginConfig) => {
    const queryFields = schema.getQueryType().getFields();
    const queries = Object.keys(queryFields)
        .map(key => queryFields[key])
        .map(field =>
            `query ${field.name.charAt(0).toUpperCase() + field.name.slice(1)}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => '$' + arg.name + ': ' + arg.type).join(', ') + ')' : ''} {
    ${field.name}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => arg.name + ': $' + arg.name).join(', ') + ')' : ''} ${getSelections(field)}
}
        `);

    return {
        prepend: ['1', '2', '3'],
        content: queries.join('\r\n')
    };
};

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];

const getSelections = (field) => {
    const fieldType = getFieldType(field.type);
    if (fieldType._fields) {
        return `{
        ${Object.values(fieldType._fields)
                .filter(field => !getFieldType(field.type)._fields)
                .filter(field => !aggregateSuffix.some(suffix => field.name.slice(-suffix.length) === suffix))
                .map(field => field.name)
                .join('\r\n\t\t')}
    }`;
    }
    return '';
}

const getFieldType = (type) => {
    if (type.ofType) {
        return getFieldType(type.ofType);
    }
    return type;
}
exports.plugin = plugin;