import type { TreeStruct } from "./index.js"

export interface NodeTree {
    node: TreeStruct | null | undefined
    children?: NodeTree[] | null | undefined
}