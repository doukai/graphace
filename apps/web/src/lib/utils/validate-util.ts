import { get } from 'svelte/store';
import { JsonSchema } from '@graphace/commons';
import { GraphQLErrorBuilder } from '@graphace/graphql';
import { graphql } from '$houdini';
import LL from '$i18n/i18n-svelte';
import type { NamespaceWebTranslation } from '$i18n/i18n-types';

const LoadSchemaByNameQuery = graphql(`
    query LoadSchemaByName($name: String) {
        jsonSchema(name: $name)
    }
`);

class GraphQLJsonSchema extends JsonSchema {
    async loadSchema(name: string) {
        const jsonSchema = (await LoadSchemaByNameQuery.fetch({ variables: { name } })).data?.jsonSchema;
        if (jsonSchema) {
            return JSON.parse(jsonSchema);
        }
        throw new Error('json schema undefined: ' + name);
    }
}

class I18nGraphQLErrorBuilder extends GraphQLErrorBuilder {
    loadMessage(code: number | null | undefined): string | undefined {
        if (code !== null && code !== undefined) {
            const errorKey = '' + code as keyof NamespaceWebTranslation['errors'];
            const error = get(LL).web.errors[errorKey];
            if (error) {
                return error();
            }
        }
        return undefined;
    }
}

export const { validate, validateSchema, getErrors, getSchemaErrors } = new GraphQLJsonSchema();

export const { buildGraphQLErrors, buildGlobalGraphQLErrors, buildGlobalGraphQLErrorMessage } = new I18nGraphQLErrorBuilder();