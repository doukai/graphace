export interface NodeTree<T> {
    node: T
    children?: NodeTree<T>[] | null | undefined
}

export function buildTree<T>(
    nodes: (any | null | undefined)[] | null | undefined,
    isSub: (current: T | undefined | null, parent?: T | undefined | null) => boolean,
    parent?: T | null | undefined
): NodeTree<T>[] | null | undefined {
    if (nodes) {
        return nodes
            ?.filter(
                (node) => !parent && node.deep === 0 || isSub(node, parent)
            )
            .map((node) => ({ node, children: buildTree(nodes, isSub, node) }))
    }
    return undefined;
}