import type { Edge } from "./Edge";
import type { PageInfo } from "./PageInfo";

export type Connection = {
    edges: Array<Edge>
    pageInfo: PageInfo
}