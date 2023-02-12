import type { Error } from '@graphace/commons/types';
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

export async function validateUpdate(uri: string, data: object, locale: Language = "en") {
    return validate(uri.concat("Update"), data, locale);
}

export async function validate(uri: string, data: object, locale: Language = "en") {
    let validate = ajv.getSchema(uri);
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
                            if (error.keyword === "required") {
                                if (error.instancePath) {
                                    const path = error.instancePath.split("/");
                                    if (path.length === 2) {
                                        errors[path[1]].iterms = {
                                            [error.params.missingProperty]: {
                                                message: error.message,
                                                schemaPath: error.schemaPath
                                            }
                                        }
                                    } else if (path.length === 3) {
                                        errors[path[1]].iterms = {
                                            [path[2]]: {
                                                [error.params.missingProperty]: {
                                                    message: error.message,
                                                    schemaPath: error.schemaPath
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    errors[error.params.missingProperty] = {
                                        message: error.message,
                                        schemaPath: error.schemaPath
                                    }
                                }
                            } else if (error.instancePath) {
                                const path = error.instancePath.split("/");
                                if (!errors[path[1]]) {
                                    errors[path[1]] = {};
                                }
                                if (path.length === 2) {
                                    errors[path[1]] = {
                                        message: error.message,
                                        schemaPath: error.schemaPath
                                    }
                                } else if (path.length === 3) {
                                    errors[path[1]].iterms = {
                                        [path[2]]: {
                                            message: error.message,
                                            schemaPath: error.schemaPath
                                        }
                                    }
                                } else if (path.length === 4) {
                                    errors[path[1]].iterms = {
                                        [path[2]]: {
                                            [path[3]]: {
                                                message: error.message,
                                                schemaPath: error.schemaPath
                                            }
                                        }
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
        } else {
            throw new Error('validate undefined');
        }
    });
}

function removeEmpty(data: object): object {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([_, v]) => Array.isArray(v) ? v !== null && v.length > 0 : v !== null)
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