import type { ErrorObject } from 'ajv';
import { createValidator as _createValidator, type ValidatorStore } from '@graphace/commons';
import { createGraphQLErrorBuilder } from '@graphace/graphql';
import { createQuery_jsonSchema_Store } from '~/lib/stores/query/query_jsonSchema_store';
import { LL } from '$i18n/i18n-svelte';
import type { NamespaceErrorsTranslation } from '$i18n/i18n-types';
import type { LoadEvent, RequestEvent } from '@sveltejs/kit';

export let validator: ValidatorStore;

export const createValidator = (event: LoadEvent | RequestEvent) => {
    const query_jsonSchema_Store = createQuery_jsonSchema_Store(event);
    validator = _createValidator({
        loadSchema: async (name: string) => {
            const jsonSchema = (await query_jsonSchema_Store.fetch({ name })).data?.jsonSchema;
            if (jsonSchema) {
                return JSON.parse(jsonSchema);
            }
            throw new Error('json schema undefined: ' + name);
        },
        buildErrorMessages: (errors: ErrorObject[]) => { }
    })
}

let $LL: TranslationFunctions;
LL.subscribe(value => $LL = value);

export const { buildGraphQLErrors, buildGlobalGraphQLErrors, buildGlobalGraphQLErrorMessage } = createGraphQLErrorBuilder((code: number | null | undefined) => {
    if (code !== null && code !== undefined) {
        const errorCode = '' + code as keyof NamespaceErrorsTranslation['code'];
        const error = $LL.errors.code[errorCode];
        if (error) {
            return error();
        }
    }
    return undefined;
});