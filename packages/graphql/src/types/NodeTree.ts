import type { TreeStruct } from "./TreeStruct.js"

export interface NodeTree {
    node: TreeStruct | null | undefined
    children?: NodeTree[] | null | undefined
}