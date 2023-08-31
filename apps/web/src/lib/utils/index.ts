import Ajv from 'ajv';
import addFormats from "ajv-formats"
import { PUBLIC_SCHEMA_URL } from '$env/static/public';
import { PUBLIC_QUERY_TYPE_NAME } from '$env/static/public';
import { PUBLIC_MUTATION_TYPE_NAME } from '$env/static/public';
import { PUBLIC_SUBSCRIPTION_TYPE_NAME } from '$env/static/public';
import type { Errors } from '@graphace/commons/types';
import type { Language } from '@graphace/graphql/schema/json-schema';
import { validate as _validate, validateAsync as _validateAsync, objectNameToFieldName, objectNameToUri } from '@graphace/graphql/schema/json-schema';

export const ajv = addFormats(new Ajv({ loadSchema: loadSchema, allErrors: true, messages: false }));

export async function loadSchema(uri: string) {
    const res = await fetch(`${PUBLIC_SCHEMA_URL}/${uri}`);
    return res.json();
}

export async function validateQuery(objectName: string, data: object, list: boolean | undefined, locale: Language = "en"): Promise<object> {
    let uri = PUBLIC_QUERY_TYPE_NAME + "_" + objectNameToFieldName(objectName);
    if (list) {
        uri += "List";
    }
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validateMutation(objectName: string, data: object, update: boolean | undefined, locale: Language = "en"): Promise<object> {
    const uri = objectNameToUri(PUBLIC_MUTATION_TYPE_NAME, objectName, data, update);
    if (Array.isArray(data)) {
        return _validate(ajv, loadSchema, uri, { list: data }, locale);
    }
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validateSubscription(objectName: string, data: object, list: boolean | undefined, locale: Language = "en"): Promise<object> {
    let uri = PUBLIC_SUBSCRIPTION_TYPE_NAME + "_" + objectNameToFieldName(objectName);
    if (list) {
        uri += "List";
    }
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validate(uri: string, data: object, locale: Language = "en"): Promise<object> {
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validateAsync(uri: string, data: object, locale: Language = "en"): Promise<Record<string, Errors> | undefined> {
    return _validateAsync(ajv, loadSchema, uri, data, locale);
}