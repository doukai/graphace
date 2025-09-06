import type { Error, Errors } from '@graphace/commons';
import { buildErrorsTree } from '@graphace/commons';
import type { GraphQLError } from '~/types/index.js';

export const createGraphQLErrorBuilder = (loadMessage: (code: number | null | undefined) => string | undefined) => {

    const buildGraphQLErrors = (errors: GraphQLError[], data: any): Record<string, Errors> => {
        const pathErrors: Record<string, Error[]> = {};
        errors.filter(error => error.path)
            .map(error => ({ ...error, message: loadMessage(error.extensions?.code) || error.message }))
            .reduce((errors, error) => {
                errors['/' + error.path?.join('/')] = [...errors['/' + error.path?.join('/')] || [], error];
                return errors;
            }, pathErrors);

        let errorsTree: Record<string, Errors> = {};
        Object.entries(pathErrors).forEach(
            ([path, errors]) => {
                errorsTree = buildErrorsTree(path.split('/').slice(1), data, errors, errorsTree);
            }
        );
        return errorsTree;
    }

    const buildGlobalGraphQLErrors = (errors: GraphQLError[]): Error[] => {
        return errors.filter(error => !error.path)
            .map(error => ({ ...error, message: loadMessage(error.extensions?.code) || error.message }));
    }

    const buildGlobalGraphQLErrorMessage = (errors: GraphQLError[]): string | undefined => {
        const globalErrors = buildGlobalGraphQLErrors(errors);
        if (globalErrors.length > 0) {
            return globalErrors.map(error => error.message).join('<br />');
        }
        return undefined;
    }

    return {
        buildGraphQLErrors,
        buildGlobalGraphQLErrors,
        buildGlobalGraphQLErrorMessage
    }
}