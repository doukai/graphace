import type { Edge, PageInfo } from "./index.js";

export type Connection<T> = {
    totalCount: number
    edges: Array<Edge<T>>
    pageInfo: PageInfo
}