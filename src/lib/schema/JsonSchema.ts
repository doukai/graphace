import type { Error } from '$lib/types';
import Ajv from 'ajv';
import addFormats from "ajv-formats"
import localize from 'ajv-i18n';
const SCHEMA_ENDPOINT = 'http://localhost:8080/schema';

export const ajv = addFormats(new Ajv({ loadSchema: loadSchema, allErrors: true, messages: false }));

async function loadSchema(uri: string) {
    const res = await fetch(`${SCHEMA_ENDPOINT}/${uri}`);
    return res.json();
}

export async function validate(uri: string, data: object, locale: Locales = "en") {
    let validate = ajv.getSchema(uri);
    if (!validate) {
        const schema = await loadSchema(uri);
        validate = await ajv.compileAsync(schema);
    }
    removeEmpty(data);

    return new Promise((resolve: (data: object) => void, reject: (errors: Record<string, Error>) => void) => {
        const valid = validate(data);
        const errors: Record<string, Error> = {};

        if (!valid) {
            localize[locale](validate.errors);

            console.log(JSON.stringify(validate.errors));
            validate.errors.forEach(
                (error) => {
                    if (error.keyword === "required") {
                        if (error.instancePath) {
                            const path = error.instancePath.split("/");
                            if (!errors[path[1]]) {
                                errors[path[1]] = {};
                            }
                            if (path.length === 2) {
                                if (!errors[path[1]].iterms) {
                                    errors[path[1]].iterms = {};
                                }
                                errors[path[1]].iterms[error.params.missingProperty] = {
                                    message: error.message,
                                    params: error.params
                                }
                            } else if (path.length === 3) {
                                if (!errors[path[1]].iterms) {
                                    errors[path[1]].iterms = {};
                                }
                                if (!errors[path[1]].iterms[path[2]]) {
                                    errors[path[1]].iterms[path[2]] = {};
                                }
                                errors[path[1]].iterms[path[2]][error.params.missingProperty] = {
                                    message: error.message,
                                    params: error.params
                                }
                            }
                        } else {
                            errors[error.params.missingProperty] = {
                                message: error.message,
                                params: error.params
                            }
                        }
                    } else if (error.instancePath) {
                        const path = error.instancePath.split("/");
                        if (!errors[path[1]]) {
                            errors[path[1]] = {};
                        }
                        if (path.length === 2) {
                            errors[path[1]].message = error.message;
                            errors[path[1]].params = error.params;
                        } else if (path.length === 3) {
                            if (!errors[path[1]].iterms) {
                                errors[path[1]].iterms = {};
                            }
                            if (!errors[path[1]].iterms[path[2]]) {
                                errors[path[1]].iterms[path[2]] = {};
                            }
                            errors[path[1]].iterms[path[2]].message = error.message;
                            errors[path[1]].iterms[path[2]].params = error.params;
                        } else if (path.length === 4) {
                            if (!errors[path[1]].iterms) {
                                errors[path[1]].iterms = {};
                            }
                            if (!errors[path[1]].iterms[path[2]]) {
                                errors[path[1]].iterms[path[2]] = {};
                            }
                            if (!errors[path[1]].iterms[path[2]][path[3]]) {
                                errors[path[1]].iterms[path[2]][path[3]] = {};
                            }
                            errors[path[1]].iterms[path[2]][path[3]].message = error.message;
                            errors[path[1]].iterms[path[2]][path[3]].params = error.params;
                        }
                    }
                }
            );
            console.log(ajv.errorsText(validate.errors, { separator: '\n' }));
            reject(errors)
        } else {
            resolve(data);
        }
    });
}

function removeEmpty(data: object): void {
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            if (!data[key] || data[key].length === 0) {
                delete data[key];
            } else {
                data[key].forEach(item => removeEmpty(item));
            }
        } else {
            if (!data[key]) {
                delete data[key];
            } else {
                if (typeof data[key] === 'object') {
                    removeEmpty(data[key]);
                }
            }
        }
    });
}