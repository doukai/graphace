import type { Error, Errors } from '@graphace/commons';
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
            errorsTree = buildGraphQLErrorsTree(path.split('/').slice(1), errors, errorsTree);
        }
    );
    return errorsTree;
}

function buildGraphQLErrorsTree(path: string[], errors: Error[], errorsTree: Record<string, Errors>): Record<string, Errors> {
    if (path.length === 1) {
        errorsTree[path[0]] = {
            errors: [...errorsTree[path[0]]?.errors || [], ...errors],
            iterms: errorsTree[path[0]]?.iterms
        };
    } else if (path.length > 1) {
        errorsTree[path[0]] = {
            errors: errorsTree[path[0]]?.errors,
            iterms: { ...errorsTree[path[0]]?.iterms || {}, ...buildGraphQLErrorsTree(path.slice(1), errors, errorsTree[path[0]]?.iterms || {}) }
        };
    }
    return errorsTree;
}