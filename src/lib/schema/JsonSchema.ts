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

    return new Promise((resolve: (data: object) => void, reject: (errors: Record<string, Error>) => void) => {
        const valid = validate(buildValidData(data));

        if (!valid) {
            localize[locale](validate.errors);
            const errors: Record<string, Error> = {};

            console.log(JSON.stringify(validate.errors));
            validate.errors.forEach(
                (error) => {
                    if (error.keyword === "required") {
                        (errors[error.params.missingProperty] = {
                            message: error.message,
                            params: error.params
                        })
                    } else {
                        (errors[error.instancePath.substring(1)] = {
                            message: error.message,
                            params: error.params
                        })
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

function buildValidData(data: object): object {
    const validData = {};
    Object.keys(data).forEach((key) => { if (data[key]) { validData[key] = data[key] } });
    return validData;
}