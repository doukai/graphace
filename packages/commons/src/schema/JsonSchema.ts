import type { Error, Errors, Language } from '..';
import Ajv from 'ajv';
import type { ErrorObject, SchemaObject, ValidateFunction } from 'ajv';
import addFormats from "ajv-formats"
import localize from 'ajv-i18n';

export abstract class JsonSchema {
    ajv: Ajv = addFormats(new Ajv({ loadSchema: this.loadSchema, allErrors: true, messages: false }));
    public constructor() {
    }
    public async validate(keyRef: string, data: unknown, locale: Language = "en"): Promise<unknown> {
        const validate = await this.getValidate(keyRef);
        return new Promise((resolve: (data: unknown) => void, reject: (errors: Record<string, Errors>) => void) => {
            if (validate) {
                // const validateData = removeEmpty(data);
                const valid = validate(data);
                if (!valid) {
                    localize[locale](validate.errors);
                    if (validate.errors) {
                        reject(buildErrors(validate.errors));
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

    public async getErrors(keyRef: string, data: object, locale: Language = "en"): Promise<Record<string, Errors> | undefined> {
        const validate = await this.getValidate(keyRef);
        if (validate) {
            // const validateData = removeEmpty(data);
            const valid = validate(data);
            if (!valid) {
                localize[locale](validate.errors);
                if (validate.errors) {
                    return buildErrors(validate.errors);
                } else {
                    throw new Error('validate errors undefined');
                }
            } else {
                return undefined;
            }
        } else {
            throw new Error('validate undefined');
        }
    }

    private async getValidate(keyRef: string): Promise<ValidateFunction<unknown> | undefined> {
        let validate = this.ajv.getSchema(keyRef);
        if (!validate) {
            const schema = await this.loadSchema(keyRef);
            validate = await this.ajv.compileAsync(schema);
        }
        return validate;
    }

    protected abstract loadSchema(keyRef: string): Promise<SchemaObject>;
}

function buildErrors(errors: ErrorObject[]): Record<string, Errors> {
    const instancePathErrors: Record<string, Error[]> = {};
    errors.map(error => {
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
    return errorsTree;
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