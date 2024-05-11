export type Error = {
    message?: string;
    keyword?: unknown;
    params?: unknown;
    propertyName?: string;
    schemaPath?: string;
    extensions?: { code: number | null | undefined, timestamp: string | null | undefined }
}

export type Errors = {
    errors?: Error[];
    iterms?: Record<string, Errors>;
}

export function buildErrorsTree(path: string[], errors: Error[], errorsTree: Record<string, Errors>): Record<string, Errors> {
    if (path.length === 1) {
        const _errors = [...errorsTree[path[0]]?.errors || [], ...errors];
        errorsTree[path[0]] = {
            errors: _errors.filter(
                (error, index) =>
                    _errors.findIndex((item) => item.message === error.message) === index
            ),
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