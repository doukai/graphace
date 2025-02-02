import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { JsonSchema } from '@graphace/commons';
import { GraphQLErrorBuilder } from '@graphace/graphql';
import { createQuery_jsonSchema_Store } from '~/lib/stores/query/query_jsonSchema_store';
import LL from '$i18n/i18n-svelte';
import type { NamespaceErrorsTranslation } from '$i18n/i18n-types';

export function createJsonSchema(event: LoadEvent | RequestEvent): JsonSchema {
    const query_jsonSchema_Store = createQuery_jsonSchema_Store(event);
    class GraphQLJsonSchema extends JsonSchema {
        async loadSchema(name: string) {
            const jsonSchema = (await query_jsonSchema_Store.fetch({ name })).data?.jsonSchema;
            if (jsonSchema) {
                return JSON.parse(jsonSchema);
            }
            throw new Error('json schema undefined: ' + name);
        }
    }
    return new GraphQLJsonSchema();
}

let _jsonSchema: JsonSchema;

export function setJsonSchema(jsonSchema: JsonSchema) {
    _jsonSchema = jsonSchema;
}

export function getJsonSchema(event: LoadEvent | RequestEvent): JsonSchema {
    if (!_jsonSchema) {
        _jsonSchema = createJsonSchema(event);
    }
    return _jsonSchema;
}

class I18nGraphQLErrorBuilder extends GraphQLErrorBuilder {
    loadMessage(code: number | null | undefined): string | undefined {
        if (code !== null && code !== undefined) {
            const errorCode = '' + code as keyof NamespaceErrorsTranslation['code'];
            const error = get(LL).errors.code[errorCode];
            if (error) {
                return error();
            }
        }
        return undefined;
    }
}

export const { buildGraphQLErrors, buildGlobalGraphQLErrors, buildGlobalGraphQLErrorMessage } = new I18nGraphQLErrorBuilder();