import type { Invalidator, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import type { AnyValidateFunction, AnySchemaObject, Format } from 'ajv/dist/types';
import addFormats from "ajv-formats";
import type { Error, Errors } from '../index.js';
import { buildErrorsTree } from '../index.js';

const buildErrors = (errors: ErrorObject[], data: any): Record<string, Errors> => {
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
            errorsTree = buildErrorsTree(instancePath.split('/').slice(1), data, errors, errorsTree);
        }
    );
    return errorsTree;
}

export function createValidator(options: {
    loadSchema(keyRef: string): Promise<AnySchemaObject>;
    buildErrorMessages: (errors: ErrorObject[]) => void;
    formats?: Record<string, Format> | undefined;
}): ValidatorStore {
    const validator: Writable<{ isValidating: boolean, errors?: Record<string, Errors> | undefined }> = writable({
        isValidating: false
    });
    const { subscribe, update } = validator;
    const ajv: Ajv = addFormats(new Ajv({ loadSchema: options.loadSchema, allErrors: true, messages: false }));
    if (options.formats) {
        Object.entries(options.formats).forEach(([name, format]) => ajv.addFormat(name, format));
    }
    const getValidate = async <T>(keyRef: string): Promise<AnyValidateFunction<T> | undefined> => {
        let validate = ajv.getSchema<T>(keyRef);
        if (!validate) {
            const schema = await options.loadSchema(keyRef);
            ajv.addSchema(schema, keyRef);
            validate = await ajv.compileAsync(schema);
        }
        return validate;
    }

    const execute = async <T>(validate: AnyValidateFunction<T> | undefined, data: T): Promise<T> => {
        return new Promise((resolve: (data: T) => void, reject: (errors: Record<string, Errors>) => void) => {
            if (validate) {
                const valid = validate(data);
                if (!valid) {
                    if (validate.errors) {
                        console.error(validate.errors);
                        let anyOfErrors;
                        if ((<any>data)?.input) {
                            anyOfErrors = validate.errors.filter(error => error.instancePath?.startsWith('/input/'));
                        } else if ((<any>data)?.list) {
                            anyOfErrors = validate.errors.filter(error => error.instancePath?.startsWith('/list/'));
                        } else {
                            anyOfErrors = validate.errors;
                        }
                        options.buildErrorMessages(anyOfErrors);
                        const errors = buildErrors(anyOfErrors, data);
                        update(() => ({ isValidating: false, errors }));
                        reject(errors);
                    } else {
                        update(() => ({ isValidating: false }));
                        throw new Error('validate errors undefined');
                    }
                } else {
                    update(() => ({ isValidating: false }));
                    resolve(data);
                }
            } else {
                update(() => ({ isValidating: false }));
                throw new Error('validate undefined');
            }
        });
    }

    const validate = async <T>(keyRef: string, data: T): Promise<T> => {
        update(() => ({ isValidating: true }));
        const validate = await getValidate(keyRef);
        return <T>execute(validate, data);
    };

    const validateSchema = async <T>(schemaObject: AnySchemaObject, data: T): Promise<T> => {
        update(() => ({ isValidating: true }));
        const validate = await ajv.compileAsync(schemaObject);
        return <T>execute(validate, data);
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
        errors?: Record<string, Errors> | undefined;
    }>, invalidate?: Invalidator<{
        isValidating: boolean;
        errors?: Record<string, Errors> | undefined;
    }> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<{
        isValidating: boolean;
        errors?: Record<string, Errors> | undefined;
    }>) => void;
    validate: <T>(keyRef: string, data: T) => Promise<T>;
    validateSchema: <T>(schemaObject: AnySchemaObject, data: T) => Promise<T>;
}