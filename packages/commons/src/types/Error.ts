export type Error = {
    message?: string;
    keyword?: string | undefined;
    params?: Record<string, any> | undefined;
    propertyName?: string;
    schemaPath?: string;
    extensions?: { code: number | null | undefined, timestamp: string | null | undefined }
}

export type Errors = {
    errors?: Error[];
    iterms?: Record<string, Errors>;
}