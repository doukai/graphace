export type Error = {
    message?: string;
    keyword?: any;
    params?: any;
    propertyName?: string;
    schemaPath?: string;
    extensions?: { code: number | null | undefined, timestamp: string | null | undefined }
}

export type Errors = {
    errors?: Error[];
    iterms?: Record<string, Errors>;
}

export function buildErrorsTree(path: string[], data: any, errors: Error[], errorsTree: Record<string, Errors>): Record<string, Errors> {
    let anyOfErrors: Error[];
    if (data.where || data.id !== undefined && data.id !== null) {
        anyOfErrors = errors.filter(error => error.keyword !== 'required');
    } else {
        anyOfErrors = errors.filter(error => error.keyword !== 'required' || error.params?.missingProperty !== 'where' && error.params?.missingProperty !== 'id');
    }
    if (path.length === 1) {
        anyOfErrors = [...errorsTree[path[0]]?.errors || [], ...anyOfErrors];
        errorsTree[path[0]] = {
            errors: anyOfErrors.filter(
                (error, index) =>
                    anyOfErrors.findIndex((item) => item.message === error.message) === index
            ),
            iterms: errorsTree[path[0]]?.iterms
        };
    } else if (path.length > 1) {
        errorsTree[path[0]] = {
            errors: errorsTree[path[0]]?.errors,
            iterms: { ...errorsTree[path[0]]?.iterms || {}, ...buildErrorsTree(path.slice(1), data[path[0]], anyOfErrors, errorsTree[path[0]]?.iterms || {}) }
        };
    }
    return Object.fromEntries(
        Object.entries(errorsTree)
            .filter(([_, v]) => v.errors && v.errors.length > 0 || v.iterms && Object.keys(v.iterms).length > 0)
    );
}