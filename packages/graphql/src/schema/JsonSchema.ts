import type { Error } from '@graphace/commons/types';
import Ajv, { type ErrorObject } from 'ajv';
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

export async function validate(uri: string, data: object, update: boolean = false, locale: Language = "en") {
    let validate = ajv.getSchema(update ? uri.concat("Update") : uri);
    if (!validate) {
        const schema = await loadSchema(uri);
        validate = await ajv.compileAsync(schema);
    }

    return new Promise((resolve: (data: object) => void, reject: (errors: Record<string, Error>) => void) => {
        const errors: Record<string, Error> = {};
        if (validate) {
            const validateData = removeEmpty(data);
            const valid = validate(validateData);
            if (!valid) {
                localize[locale](validate.errors);
                if (validate.errors) {
                    validate.errors.forEach(
                        (error) => {
                            if (error.instancePath) {
                                const path = error.instancePath.split("/");
                                path.shift();
                                buildErrors(error, path, errors);
                            } else {
                                if (error.keyword === "required") {
                                    errors[error.params.missingProperty] = {
                                        message: error.message,
                                        schemaPath: error.schemaPath
                                    }
                                }
                            }
                        }
                    );
                }
                console.error(ajv.errorsText(validate.errors, { separator: '\n' }));
                reject(errors);
            } else {
                resolve(validateData);
            }
        }
        throw new Error('validate undefined');
    });
}

function buildErrors(error: ErrorObject, path: string[], errors: Record<string, Error>): void {
    if (path.length === 1) {
        const property = path[0];
        if (property) {
            if (error.keyword === "required") {
                errors[property] = {
                    ...errors[property],
                    iterms: {
                        ...errors[property].iterms,
                        [error.params.missingProperty]: {
                            message: error.message,
                            schemaPath: error.schemaPath
                        }
                    }
                };
            } else {
                errors[property] = {
                    message: error.message,
                    schemaPath: error.schemaPath
                }
            }
        }
    } else {
        const property = path.shift();
        if (property) {
            const iterms: Record<string, Error> = {};
            buildErrors(error, path, iterms);
            errors[property] = {
                ...errors[property],
                iterms: {
                    ...errors[property].iterms,
                    iterms
                }
            };
        }
    }
}

function removeEmpty(data: object): object {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([_, v]) => Array.isArray(v) ? v !== undefined && v.length > 0 : v !== undefined)
            .filter(([_, v]) => typeof v === 'object' ? v !== undefined && Object.keys(v).length > 0 : v !== undefined)
            .map(([k, v]) => {
                if (Array.isArray(v)) {
                    return [k, v.map(item => removeEmpty(item))];
                } else if (typeof v === 'object') {
                    return [k, removeEmpty(v)];
                } else {
                    return [k, v];
                }
            })
    );
}