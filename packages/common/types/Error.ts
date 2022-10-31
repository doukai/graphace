export type Error = {
    message?: string;
    schemaPath?: string;
    iterms?: Record<string, Error>
}