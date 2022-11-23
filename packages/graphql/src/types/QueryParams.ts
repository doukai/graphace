import type { __Type, __FieldFilter } from "./";

export type QueryParams = {
    __type?: __Type;
    queryValue?: string;
    fieldFilters?: Array<__FieldFilter>;
    pageSize?: number;
    after?: string;
    before?: string;
    offset?: number;
};