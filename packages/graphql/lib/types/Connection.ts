import type { Edge, PageInfo } from "../../";

export type Connection = {
    totalCount: number
    edges: Array<Edge>
    pageInfo: PageInfo
}