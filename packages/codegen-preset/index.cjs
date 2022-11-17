"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("@graphql-codegen/plugin-helpers");
const path = require("path");
exports.preset = {
    buildGeneratesSection: options => {
        const queryFields = options.schemaAst.getQueryType().getFields();
        const mutationFields = options.schemaAst.getMutationType().getFields();
        return Object.keys(queryFields)
            .map(key => queryFields[key])
            .map(field => {
                return {
                    filename: options.baseOutputDir + 'queries/' + field.name.charAt(0).toUpperCase() + field.name.slice(1) + '.gql',
                    documents: options.documents,
                    plugins: options.plugins,
                    pluginMap: options.pluginMap,
                    config: {
                        ...options.config,
                        operationType: 'query',
                        fieldName: field.name
                    },
                    schema: options.schema,
                    schemaAst: options.schemaAst,
                    skipDocumentsValidation: true,
                };
            }).concat(
                Object.keys(mutationFields)
                    .map(key => mutationFields[key])
                    .map(field => {
                        return {
                            filename: options.baseOutputDir + 'mutations/' + field.name.charAt(0).toUpperCase() + field.name.slice(1) + '.gql',
                            documents: options.documents,
                            plugins: options.plugins,
                            pluginMap: options.pluginMap,
                            config: {
                                ...options.config,
                                operationType: 'mutation',
                                fieldName: field.name
                            },
                            schema: options.schema,
                            schemaAst: options.schemaAst,
                            skipDocumentsValidation: true,
                        };
                    })
            );
    }

};
exports.default = exports.preset;