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

export async function validate(uri: string, data: Record<string, any>, locale: Language = "en") {
    let validate = ajv.getSchema(uri);
    if (!validate) {
        const schema = await loadSchema(uri);
        validate = await ajv.compileAsync(schema);
    }
    removeEmpty(data);

    return new Promise((resolve: (data: Record<string, any>) => void, reject: (errors: Record<string, Error>) => void) => {
        const errors: Record<string, Error> = {};
        if (validate) {
            const valid = validate(data);
            if (!valid) {
                localize[locale](validate.errors);
                console.error(JSON.stringify(validate.errors));
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
                console.log(ajv.errorsText(validate.errors, { separator: '\n' }));
                reject(errors);
            } else {
                resolve(data);
            }
            reject(errors);
        }
    });
}

function removeEmpty(data: Record<string, any>): void {
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            if (!data[key] || data[key].length === 0) {
                data.delete(key);
            } else {
                data.set(key, data[key].filter((item: Record<string, any>) => item));
                if (data[key].length === 0) {
                    data.delete(key);
                } else {
                    data[key].forEach((item: Record<string, any>) => {
                        removeEmpty(item);
                    });
                }
            }
        } else {
            if (!data[key]) {
                data.delete(key);
            } else {
                if (typeof data[key] === 'object') {
                    removeEmpty(data[key]);
                }
            }
        }
    });
}