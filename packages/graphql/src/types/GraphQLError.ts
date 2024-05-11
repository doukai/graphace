import type { Error, Errors } from '@graphace/commons';
import { buildErrorsTree } from '@graphace/commons';

export type GraphQLError = {
    message: string;
    locations?: ({ line: number | null | undefined, column: number | null | undefined })[] | null;
    path?: string[] | null;
    extensions?: { code: number | null | undefined, timestamp: string | null | undefined }
}

export function buildGraphQLErrors(errors: GraphQLError[]): Record<string, Errors> {
    const pathErrors: Record<string, Error[]> = {};
    errors.filter(error => error.path)
        .reduce((errors, error) => {
            errors['/' + error.path!.join('/')] = [...errors['/' + error.path!.join('/')] || [], error];
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