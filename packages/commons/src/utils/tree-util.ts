export type NodeTree<T> = Map<T, NodeTree<T>>;

export function buildTree<T>(
    nodes: (any | null | undefined)[],
    isSub: (current: T | undefined | null, parent?: T | undefined | null) => boolean,
    parent?: T | null | undefined
): NodeTree<T> {
    return Object.fromEntries(
        nodes
            ?.filter(
                (node) => isSub(node, parent)
            )
            .map((node) => [node, buildTree(nodes, isSub, node)])
    );
}