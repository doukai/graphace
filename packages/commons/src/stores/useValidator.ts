import type { Invalidator, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import type { AnyValidateFunction, AnySchemaObject } from 'ajv/dist/types';
import addFormats from "ajv-formats";
import type { Error, Errors } from '../index.js';
import { buildErrorsTree } from '../index.js';

const execute = async <T>(validate: AnyValidateFunction<T> | undefined, data: T, buildErrorMessages: (errors: ErrorObject[]) => void): Promise<T> => {
    return new Promise((resolve: (data: T) => void, reject: (errors: Record<string, Errors>) => void) => {
        if (validate) {
            const valid = validate(data);
            if (!valid) {
                if (validate.errors) {
                    buildErrorMessages(validate.errors);
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

const buildErrors = (errors: ErrorObject[]): Record<string, Errors> => {
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

export function createValidator(options: {
    loadSchema(keyRef: string): Promise<AnySchemaObject>;
    buildErrorMessages: (errors: null | ErrorObject[] | undefined) => void;
}): ValidatorStore {
    const validator: Writable<{ isValidating: boolean, response: { data?: unknown, errors?: Record<string, Errors> | undefined } }> = writable({
        isValidating: false,
        response: {}
    });
    const { subscribe, set, update } = validator;
    const ajv: Ajv = addFormats(new Ajv({ loadSchema: options.loadSchema, allErrors: true, messages: false }));
    const getValidate = async <T>(keyRef: string): Promise<AnyValidateFunction<T> | undefined> => {
        let validate = ajv.getSchema<T>(keyRef);
        if (!validate) {
            const schema = await options.loadSchema(keyRef);
            ajv.addSchema(schema, keyRef);
            validate = await ajv.compileAsync(schema);
        }
        return validate;
    }

    const validate = async <T>(keyRef: string, data: T): Promise<T> => {
        update((data) => ({ ...data, isFetching: true }));
        const validate = await getValidate(keyRef);
        return <T>execute(validate, data, options.buildErrorMessages)
            .then(data =>
                set({
                    isValidating: false,
                    response: { data }
                })
            )
            .catch(errors =>
                set({
                    isValidating: false,
                    response: { errors }
                })
            );
    };

    const validateSchema = async <T>(schemaObject: AnySchemaObject, data: T): Promise<T> => {
        update((data) => ({ ...data, isValidating: true }));
        const validate = await ajv.compileAsync(schemaObject);
        return <T>execute(validate, data, options.buildErrorMessages)
            .then(data =>
                set({
                    isValidating: false,
                    response: { data }
                })
            )
            .catch(errors =>
                set({
                    isValidating: false,
                    response: { errors }
                })
            );
    }

    return {
        subscribe,
        update,
        validate,
        validateSchema
    }
}

export type ValidatorStore = {
    subscribe: (this: void, run: Subscriber<{
        isValidating: boolean;
        response: {
            data?: unknown;
            errors?: Record<string, Errors> | undefined;
        };
    }>, invalidate?: Invalidator<{
        isValidating: boolean;
        response: {
            data?: unknown;
            errors?: Record<string, Errors> | undefined;
        };
    }> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<{
        isValidating: boolean;
        response: {
            data?: unknown;
            errors?: Record<string, Errors> | undefined;
        };
    }>) => void;
    validate: <T>(keyRef: string, data: T) => Promise<T>;
    validateSchema: <T>(schemaObject: AnySchemaObject, data: T) => Promise<T>;
}