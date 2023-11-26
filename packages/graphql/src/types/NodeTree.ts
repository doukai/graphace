import type { TreeStruct } from "./TreeStruct"

export interface NodeTree {
    node: TreeStruct | null | undefined
    children?: NodeTree[] | null | undefined
}