import type { Edge, PageInfo } from "./";

export type Connection<T> = {
    totalCount: number
    edges: Array<Edge<T>>
    pageInfo: PageInfo
}