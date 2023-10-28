export type Error = {
    message?: string;
    schemaPath?: string;
}

export type Errors = {
    errors?: Error[];
    iterms?: Record<string, Errors>
}