import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { TypeScriptPluginConfig } from './config.js';
import type { GraphQLSchema } from 'graphql';

export const plugin: PluginFunction<TypeScriptPluginConfig, Types.ComplexPluginOutput> = (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: TypeScriptPluginConfig
) => {
    const { schema: _schema, ast } = transformSchemaAST(schema, config);

    const visitor = new TsVisitor(_schema, config);

    const visitorResult = oldVisit(ast, { leave: visitor });
    const introspectionDefinitions = includeIntrospectionTypesDefinitions(_schema, documents, config);
    const scalars = visitor.scalarsDefinition;
    const directiveArgumentAndInputFieldMappings = visitor.directiveArgumentAndInputFieldMappingsDefinition;

    return {
        prepend: [
            ...visitor.getEnumsImports(),
            ...visitor.getDirectiveArgumentAndInputFieldMappingsImports(),
            ...visitor.getScalarsImports(),
            ...visitor.getWrapperDefinitions(),
        ].filter(Boolean),
        content: [
            scalars,
            directiveArgumentAndInputFieldMappings,
            ...visitorResult.definitions,
            ...introspectionDefinitions,
        ]
            .filter(Boolean)
            .join('\n'),
    };
};