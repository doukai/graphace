import type { Error, Errors } from '@graphace/commons';
import { buildErrorsTree } from '@graphace/commons';
import type { GraphQLError } from '~/types/index.js';

export abstract class GraphQLErrorBuilder {

    public buildGraphQLErrors = (errors: GraphQLError[]): Record<string, Errors> => {
        const pathErrors: Record<string, Error[]> = {};
        errors.map(error => ({ ...error, message: this.loadMessage(error.extensions?.code) || error.message }))
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

    protected abstract loadMessage(code: number | null | undefined): string;
}