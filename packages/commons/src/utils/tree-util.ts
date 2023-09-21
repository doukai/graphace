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
        if (parent) {
            return nodes
                ?.filter(
                    (node) => isSub(node, parent)
                )
                .map((node) => ({ node, children: buildTree(nodes, isSub, node) }))
        } else {
            return nodes.reduce((pre, cur) => {
                if (pre.some((item: T | null | undefined) => isSub(item, cur))) {
                    pre = pre.filter((item: T | null | undefined) => !isSub(item, cur));
                } else {
                    if (!pre.some((item: T | null | undefined) => isSub(cur, item))) {
                        pre.push(cur);
                    }
                }
                return pre;
            }, [])
                .map((node: T | null | undefined) => ({ node, children: buildTree(nodes, isSub, node) }))
        }
    }
    return undefined;
}