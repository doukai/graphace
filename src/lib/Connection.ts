import type { Edge } from "./Edge";
import type { PageInfo } from "./PageInfo";

export interface Connection {
    edges: Array<Edge>
    pageInfo: PageInfo
}