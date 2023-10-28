import Ajv from 'ajv';
import addFormats from "ajv-formats"
import { PUBLIC_SCHEMA_URL } from '$env/static/public';
import { env } from '$env/dynamic/public';
import type { Errors, Language } from '@graphace/commons';
import { validate as _validate, validateAsync as _validateAsync, objectNameToUri } from '@graphace/commons';

export const ajv = addFormats(new Ajv({ loadSchema: loadSchema, allErrors: true, messages: false }));

export async function loadSchema(uri: string) {
    const res = await fetch(`${PUBLIC_SCHEMA_URL!}/${uri}`);
    return res.json();
}

export async function validateMutation(objectName: string, data: object, locale: Language = "en"): Promise<object> {
    const uri = objectNameToUri(env.PUBLIC_MUTATION_TYPE_NAME || 'Mutation', objectName, data);
    if (Array.isArray(data)) {
        return _validate(ajv, loadSchema, uri, { list: data }, locale);
    }
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validate(uri: string, data: object, locale: Language = "en"): Promise<object> {
    return _validate(ajv, loadSchema, uri, data, locale);
}

export async function validateAsync(uri: string, data: object, locale: Language = "en"): Promise<Record<string, Errors> | undefined> {
    return _validateAsync(ajv, loadSchema, uri, data, locale);
}