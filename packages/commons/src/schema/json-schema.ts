import type { Error, Errors, Language } from '../';
import type { ErrorObject } from 'ajv';
import localize from 'ajv-i18n';
import type { AnyValidateFunction } from 'ajv/dist/types';
import * as changeCase from "change-case";

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

export async function execute(validate: AnyValidateFunction<unknown> | undefined, data: object, locale: Language = "en"): Promise<object> {
    return new Promise((resolve: (data: object) => void, reject: (errors: Record<string, Errors>) => void) => {
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

export async function executeAsync(validate: AnyValidateFunction<unknown> | undefined, data: object, locale: Language = "en"): Promise<Record<string, Errors> | undefined> {
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

export function objectNameToFieldName(objectName: string): string {
    return changeCase.camelCase(objectName);
}

export function objectNameToUri(operationTypeName: string, objectName: string, data: object | object[]): string {
    const fieldName = objectNameToFieldName(objectName);
    let uri = operationTypeName + "_" + fieldName;
    if (Array.isArray(data)) {
        uri += "List_Arguments";
    } else {
        uri += "_Arguments";
        if (Object.keys(data).includes('where')) {
            uri += "_update";
        }
    }
    return uri;
}