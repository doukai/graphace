export type Error = {
    message?: string;
    params?: unknown;
    iterms?: Record<string, Error>
}