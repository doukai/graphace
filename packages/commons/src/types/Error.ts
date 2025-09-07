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
    let targetErrors: Error[];
    if (data.where || data.id !== undefined && data.id !== null) {
        targetErrors = errors.filter(error => error.keyword !== 'required');
    } else {
        targetErrors = errors.filter(error => error.keyword !== 'required' || error.params?.missingProperty !== 'where' && error.params?.missingProperty !== 'id');
    }
    if (path.length === 1) {
        targetErrors = [...errorsTree[path[0]]?.errors || [], ...targetErrors];
        errorsTree[path[0]] = {
            errors: targetErrors.filter(
                (error, index) =>
                    targetErrors.findIndex((item) => item.message === error.message) === index
            ),
            iterms: errorsTree[path[0]]?.iterms
        };
    } else if (path.length > 1) {
        errorsTree[path[0]] = {
            errors: errorsTree[path[0]]?.errors,
            iterms: { ...errorsTree[path[0]]?.iterms || {}, ...buildErrorsTree(path.slice(1), data[path[0]], targetErrors, errorsTree[path[0]]?.iterms || {}) }
        };
    }
    return Object.fromEntries(
        Object.entries(errorsTree)
            .filter(([_, v]) => v.errors && v.errors.length > 0 || v.iterms && Object.keys(v.iterms).length > 0)
    );
}