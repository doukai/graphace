"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("@graphql-codegen/plugin-helpers");
const path = require("path");
const plugin = async (schema, _documents, pluginConfig) => {
    const operationFields = pluginConfig.operationType === 'query' ? schema.getQueryType().getFields() : schema.getMutationType().getFields();
    const field = Object.keys(operationFields)
        .map(key => operationFields[key])
        .find(field => field.name === pluginConfig.fieldName);

    return `${pluginConfig.operationType} ${pluginConfig.operationType === 'query' ? 'Query' : pluginConfig.mutationType === 'update' ? 'Update' : 'Mutation'}${field.name.charAt(0).toUpperCase() + field.name.slice(1)}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => '$' + arg.name + ': ' + arg.type).join(', ') + ')' : ''} {
    ${field.name}${field.args && field.args.length > 0 ? '(' + field.args.map(arg => arg.name + ': $' + arg.name).join(', ') + ')' : ''} ${pluginConfig.mutationType === 'update' ? '@update' : '@skipNullArguments(if: true)'} ${getSelections(field)}
}
`;
};

const aggregateSuffix = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const connectionSuffix = "Connection";

const getSelections = (field) => {
    const fieldType = getFieldType(field.type);
    if (fieldType._fields) {
        if (field.name.slice(-connectionSuffix.length) === connectionSuffix) {
            return `{
        totalCount
        edges {
            node {
                ${Object.values(getFieldType(getFieldType(fieldType._fields.edges.type)._fields.node.type)._fields)
                    .filter(field => !getFieldType(field.type)._fields)
                    .filter(field => !aggregateSuffix.some(suffix => field.name.slice(-suffix.length) === suffix))
                    .map(field => field.name)
                    .join('\r\n\t\t\t\t')}
            }
        }
    }`;
        } else {
            return `{
        ${Object.values(fieldType._fields)
                    .filter(field => !getFieldType(field.type)._fields)
                    .filter(field => !aggregateSuffix.some(suffix => field.name.slice(-suffix.length) === suffix))
                    .map(field => field.name)
                    .join('\r\n\t\t')}
    }`;
        }
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