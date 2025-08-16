import type { ErrorObject } from 'ajv';
import { createValidator as _createValidator, type ValidatorStore } from '@graphace/commons';
import { createGraphQLErrorBuilder } from '@graphace/graphql';
import { createQuery_jsonSchema_Store } from '~/lib/stores/query/query_jsonSchema_store';
import { LL } from '$i18n/i18n-svelte';
import type { NamespaceErrorsTranslation } from '$i18n/i18n-types';
import type { LoadEvent, RequestEvent } from '@sveltejs/kit';

let $LL: TranslationFunctions;
LL.subscribe(value => $LL = value);

export let validator: ValidatorStore;

export const createValidator = (event: LoadEvent | RequestEvent) => {
    if (!validator) {
        const query_jsonSchema_Store = createQuery_jsonSchema_Store(event);
        validator = _createValidator({
            loadSchema: async (name: string) => {
                const jsonSchema = (await query_jsonSchema_Store.fetch({ name })).data?.jsonSchema;
                if (jsonSchema) {
                    return JSON.parse(jsonSchema);
                }
                throw new Error('json schema undefined: ' + name);
            },
            buildErrorMessages: (errors: ErrorObject[]) => {
                for (const e of errors) {
                    let out
                    switch (e.keyword) {
                        case "additionalItems":
                        case "items":
                            out = $LL.errors.jsonSchema.items({ limit: e.params.limit });
                            break
                        case "additionalProperties":
                            out = $LL.errors.jsonSchema.additionalProperties();
                            break
                        case "anyOf":
                            out = $LL.errors.jsonSchema.anyOf();
                            break
                        case "const":
                            out = $LL.errors.jsonSchema.const();
                            break
                        case "contains":
                            out = $LL.errors.jsonSchema.contains();
                            break
                        case "dependencies":
                        case "dependentRequired":
                            out = $LL.errors.jsonSchema.dependencies({ deps: e.params.deps, property: e.params.property });
                            break
                        case "discriminator":
                            switch (e.params.error) {
                                case "tag":
                                    out = $LL.errors.jsonSchema.tag({ tag: e.params.tag });
                                    break
                                case "mapping":
                                    out = $LL.errors.jsonSchema.mapping({ tag: e.params.tag });
                                    break
                                default:
                                    out = $LL.errors.jsonSchema.discriminator({ keyword: e.params.keyword });
                            }
                            break
                        case "enum":
                            out = $LL.errors.jsonSchema.enum();
                            break
                        case "false schema":
                            out = $LL.errors.jsonSchema.false();
                            break
                        case "format":
                            out = $LL.errors.jsonSchema.format({ format: $LL.errors.formats[e.params.format as keyof NamespaceErrorsTranslation['formats']]() });
                            break
                        case "formatMaximum":
                        case "formatExclusiveMaximum":
                            out = $LL.errors.jsonSchema.formatMaximum({ comparison: e.params.comparison, limit: e.params.limit });
                            break
                        case "formatMinimum":
                        case "formatExclusiveMinimum":
                            out = $LL.errors.jsonSchema.formatMinimum({ comparison: e.params.comparison, limit: e.params.limit });
                            break
                        case "if":
                            out = $LL.errors.jsonSchema.if({ failingKeyword: e.params.failingKeyword });
                            break
                        case "maximum":
                        case "exclusiveMaximum":
                            out = $LL.errors.jsonSchema.maximum({ comparison: e.params.comparison, limit: e.params.limit });
                            break
                        case "maxItems":
                            out = $LL.errors.jsonSchema.maxItems({ limit: e.params.limit });
                            break
                        case "maxLength":
                            out = $LL.errors.jsonSchema.maxLength({ limit: e.params.limit });
                            break
                        case "maxProperties":
                            out = $LL.errors.jsonSchema.maxProperties({ limit: e.params.limit });
                            break
                        case "minimum":
                        case "exclusiveMinimum":
                            out = $LL.errors.jsonSchema.minimum({ comparison: e.params.comparison, limit: e.params.limit });
                            break
                        case "minItems":
                            out = $LL.errors.jsonSchema.minItems({ limit: e.params.limit });
                            break
                        case "minLength":
                            out = $LL.errors.jsonSchema.minLength({ limit: e.params.limit });
                            break
                        case "minProperties":
                            out = $LL.errors.jsonSchema.minProperties({ limit: e.params.limit });
                            break
                        case "multipleOf":
                            out = $LL.errors.jsonSchema.multipleOf({ multipleOf: e.params.multipleOf });
                            break
                        case "not":
                            out = $LL.errors.jsonSchema.not();
                            break
                        case "oneOf":
                            out = $LL.errors.jsonSchema.oneOf();
                            break
                        case "pattern":
                            out = $LL.errors.jsonSchema.pattern({ pattern: e.params.pattern });
                            break
                        case "patternRequired":
                            out = $LL.errors.jsonSchema.patternRequired({ missingPattern: e.params.missingPattern });
                            break
                        case "propertyNames":
                            out = $LL.errors.jsonSchema.propertyNames();
                            break
                        case "required":
                            out = $LL.errors.jsonSchema.required();
                            break
                        case "type":
                            out = "must be " + e.params.type
                            out = $LL.errors.jsonSchema.type({ type: $LL.errors.types[e.params.type as keyof NamespaceErrorsTranslation['types']]() });
                            break
                        case "unevaluatedItems":
                            out = $LL.errors.jsonSchema.unevaluatedItems({ len: e.params.len });
                            break
                        case "unevaluatedProperties":
                            out = $LL.errors.jsonSchema.unevaluatedProperties();
                            break
                        case "uniqueItems":
                            out = $LL.errors.jsonSchema.uniqueItems({ j: e.params.j, i: e.params.i });
                            break
                        default:
                            out = $LL.errors.jsonSchema.default({ keyword: e.params.keyword });
                    }
                    e.message = out
                }
            }
        });
    }
}

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