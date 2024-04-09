import Ajv from 'ajv';
import addFormats from "ajv-formats"
import type { AnyValidateFunction } from 'ajv/dist/types';
import { execute, executeAsync, objectNameToUri } from '@graphace/commons';
import type { Errors, Language } from '@graphace/commons';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

export const ajv = addFormats(new Ajv({ loadSchema: loadSchema, allErrors: true, messages: false }));

export async function loadSchema(uri: string) {
    const res = await fetch(browser ? `/${env.PUBLIC_SCHEMA_PATH || 'schema'}/${uri}` : `${env.PUBLIC_SCHEMA_URL}/${uri}`);
    return res.json();
}

export async function getValidate(uri: string): Promise<AnyValidateFunction<unknown> | undefined> {
    let validate = ajv.getSchema(uri);
    if (!validate) {
        const schema = await loadSchema(uri);
        validate = await ajv.compileAsync(schema);
    }
    return validate;
}

export async function validateMutation(objectName: string, data: object, locale: Language = "en"): Promise<object> {
    const uri = objectNameToUri(env.PUBLIC_MUTATION_TYPE_NAME || 'Mutation', objectName, data);
    const validate = await getValidate(uri);
    if (Array.isArray(data)) {
        return execute(validate, { list: data }, locale);
    }
    return execute(validate, data, locale);
}

export async function validate(uri: string, data: object, locale: Language = "en"): Promise<object> {
    const validate = await getValidate(uri);
    return execute(validate, data, locale);
}

export async function validateAsync(uri: string, data: object, locale: Language = "en"): Promise<Record<string, Errors> | undefined> {
    const validate = await getValidate(uri);
    return executeAsync(validate, data, locale);
}