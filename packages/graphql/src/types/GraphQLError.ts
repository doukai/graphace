export type GraphQLError = {
    message: string;
    locations?: ({ line: number | null | undefined, column: number | null | undefined })[] | null;
    path?: string[] | null;
    extensions?: { code: number | null | undefined, timestamp: string | null | undefined }
}