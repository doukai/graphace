import type { Error, Errors } from '@graphace/commons/types';
import Ajv from 'ajv';
import addFormats from "ajv-formats"
import localize from 'ajv-i18n';
const SCHEMA_ENDPOINT = 'http://localhost:8080/schema';

type Language =
    | "en"
    | "ar"
    | "ca"
    | "cs"
    | "de"
    | "es"
    | "fi"
    | "fr"
    | "hu"
    | "id"
    | "it"
    | "ja"
    | "ko"
    | "nb"
    | "nl"
    | "pl"
    | "pt-BR"
    | "ru"
    | "sk"
    | "sv"
    | "th"
    | "zh"
    | "zh-TW";

export const ajv = addFormats(new Ajv({ loadSchema: loadSchema, allErrors: true, messages: false }));

async function loadSchema(uri: string) {
    const res = await fetch(`${SCHEMA_ENDPOINT}/${uri}`);
    return res.json();
}

export async function validateUpdate(uri: string, data: object | object[], locale: Language = "en") {
    validate(uri, data, true, locale);
}

export async function validate(uri: string, data: object | object[], update: boolean | undefined, locale: Language = "en") {
    console.log(JSON.stringify(data));
    if (Array.isArray(data) && update) {
        uri += 'ListUpdate';
    } else if (Array.isArray(data)) {
        uri += 'List';
    } else if (update) {
        uri += "Update";
    }

    let validate = ajv.getSchema(uri);
    if (!validate) {
        const schema = await loadSchema(uri);
        validate = await ajv.compileAsync(schema);
    }
    console.log(validate);

    return new Promise((resolve: (data: object | object[]) => void, reject: (errors: Record<string, Errors>) => void) => {
        if (validate) {
            // const validateData = removeEmpty(data);
            const valid = validate(data);
            if (!valid) {
                localize[locale](validate.errors);
                if (validate.errors) {
                    const instancePathErrors: Record<string, Error[]> = {};
                    validate.errors.map(error => {
                        if (error.keyword === "required") {
                            error.instancePath += `/${error.params.missingProperty}`;
                        }
                        return error;
                    }).reduce((errors, error) => {
                        errors[error.instancePath] = [...errors[error.instancePath] || [], error];
                        return errors;
                    }, instancePathErrors);

                    let errorsTree: Record<string, Errors> = {};
                    Object.entries(instancePathErrors).forEach(
                        ([instancePath, errors]) => {
                            errorsTree = buildErrorsTree(instancePath.split('/').slice(1), errors, errorsTree);
                        }
                    );
                    console.error(ajv.errorsText(validate.errors, { separator: '\n' }));
                    reject(errorsTree);
                } else {
                    throw new Error('validate errors undefined');
                }
            } else {
                resolve(data);
            }
        } else {
            throw new Error('validate undefined');
        }
    });
}

function buildErrorsTree(path: string[], errors: Error[], errorsTree: Record<string, Errors>): Record<string, Errors> {
    if (path.length === 1) {
        errorsTree[path[0]] = {
            errors: [...errorsTree[path[0]]?.errors || [], ...errors],
            iterms: errorsTree[path[0]]?.iterms
        };
    } else if (path.length > 1) {
        errorsTree[path[0]] = {
            errors: errorsTree[path[0]]?.errors,
            iterms: { ...errorsTree[path[0]]?.iterms || {}, ...buildErrorsTree(path.slice(1), errors, errorsTree[path[0]]?.iterms || {}) }
        };
    }
    return errorsTree;
}

function removeEmpty(data: object | object[]): object {
    if (Array.isArray(data)) {
        return data.map(item => removeEmpty(item));
    } else {
        return Object.fromEntries(
            Object.entries(data)
                .filter(([_, v]) => Array.isArray(v) ? v !== undefined && v.length > 0 : v !== undefined)
                .filter(([_, v]) => typeof v === 'object' ? v !== undefined && Object.keys(v).length > 0 : v !== undefined)
                .map(([k, v]) => {
                    if (Array.isArray(v)) {
                        return [
                            k,
                            v.map(item => {
                                if (typeof item === 'object') {
                                    return removeEmpty(item);
                                } else {
                                    return item;
                                }
                            })
                        ];
                    } else if (typeof v === 'object') {
                        return [k, removeEmpty(v)];
                    } else {
                        return [k, v];
                    }
                })
        );
    }
}