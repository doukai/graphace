import type { Error, Errors } from '@graphace/commons';
import { buildErrorsTree } from '@graphace/commons';
import type { GraphQLError } from '~/types/index.js';

export type GraphQLErrorsFunction = (errors: GraphQLError[]) => Record<string, Errors>;

export type GlobalGraphQLErrorsFunction = (errors: GraphQLError[]) => Error[];

export type GlobalGraphQLErrorMessageFunction = (errors: GraphQLError[]) => string | undefined;

export abstract class GraphQLErrorBuilder {

    public buildGraphQLErrors: GraphQLErrorsFunction = (errors: GraphQLError[]): Record<string, Errors> => {
        const pathErrors: Record<string, Error[]> = {};
        errors.filter(error => error.path)
            .map(error => ({ ...error, message: this.loadMessage(error.extensions?.code) || error.message }))
            .reduce((errors, error) => {
                errors['/' + error.path?.join('/')] = [...errors['/' + error.path?.join('/')] || [], error];
                return errors;
            }, pathErrors);

        let errorsTree: Record<string, Errors> = {};
        Object.entries(pathErrors).forEach(
            ([path, errors]) => {
                errorsTree = buildErrorsTree(path.split('/').slice(1), errors, errorsTree);
            }
        );
        return errorsTree;
    }

    public buildGlobalGraphQLErrors: GlobalGraphQLErrorsFunction = (errors: GraphQLError[]): Error[] => {
        return errors.filter(error => !error.path)
            .map(error => ({ ...error, message: this.loadMessage(error.extensions?.code) || error.message }));
    }

    public buildGlobalGraphQLErrorMessage: GlobalGraphQLErrorMessageFunction = (errors: GraphQLError[]): string | undefined => {
        const globalErrors = this.buildGlobalGraphQLErrors(errors);
        if (globalErrors.length > 0) {
            return globalErrors.map(error => error.message).join('<br />');
        }
        return undefined;
    }

    protected abstract loadMessage(code: number | null | undefined): string | undefined;
}