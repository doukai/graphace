import type { Edge } from "./Edge";
import type { PageInfo } from "./PageInfo";

export type Connection = {
    totalCount: number
    edges: Array<Edge>
    pageInfo: PageInfo
}