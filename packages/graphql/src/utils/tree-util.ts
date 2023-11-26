import type { TreeStruct, NodeTree } from '../';

export function buildTree(
    nodes: (TreeStruct | null | undefined)[] | null | undefined,
    parent?: TreeStruct | null | undefined
): NodeTree[] | null | undefined {
    if (nodes) {
        if (parent) {
            return nodes
                ?.filter(
                    (node) => node?.parentId === parent?.id
                )
                .map((node) => ({ node, children: buildTree(nodes, node) }));
        } else {
            return nodes.reduce((pre, cur) => {
                if (pre.some((item: TreeStruct | null | undefined) => item?.parentId === cur?.id)) {
                    pre = pre.filter((item: TreeStruct | null | undefined) => item?.parentId !== cur?.id);
                } else {
                    if (!pre.some((item: TreeStruct | null | undefined) => item?.parentId === cur?.id)) {
                        pre.push(cur);
                    }
                }
                return pre;
            }, [] as (TreeStruct | null | undefined)[])
                .map((node: TreeStruct | null | undefined) => ({ node, children: buildTree(nodes, node) }))
        }
    }
    return undefined;
}