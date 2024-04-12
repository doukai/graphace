<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { graphql, GroupNodesQuery$input, Operator } from '$houdini';
	import { NodeTree, TreeStruct, buildTree } from '@graphace/graphql';
	import { MenuTreeLoading } from '@graphace/ui';
	import GroupTreeMenu from './GroupTreeMenu.svelte';

	export let nodeTrees: NodeTree[] | null | undefined = undefined;
	export let treeStructs: (TreeStruct | null | undefined)[] | null | undefined = undefined;
	export let parent: TreeStruct | null | undefined = undefined;
	export let currentDeep = 0;
	export let deeps = 2;
	export let groupName: string | null | undefined = undefined;
	export let activeGroupId: string | null | undefined = undefined;

	const dispatch = createEventDispatcher<{
		change: {
			activeId: string | null | undefined;
		};
	}>();

	const GroupNodesQuery = graphql(`
		query GroupNodesQuery($path: StringExpression, $deep: IntExpression, $name: StringExpression) {
			groupList(deep: $deep, path: $path, name: $name) {
				id
				name
				path
				deep
				parentId
			}
		}
	`);

	$: if (treeStructs) {
		nodeTrees = buildTree(treeStructs, parent);
	}

	$: if (parent && activeGroupId && parent?.id === activeGroupId) {
		queryNodes(groupName);
	}

	const queryNodes = (groupName?: string | null | undefined) => {
		let variables: GroupNodesQuery$input;
		if (groupName) {
			variables = {
				deep: undefined,
				path: undefined,
				name: { opr: Operator.LK, val: `%${groupName}%` }
			};
		} else {
			variables = {
				deep: { opr: Operator.LT, val: currentDeep + deeps },
				path: { opr: Operator.LK, val: `${(parent?.path || '') + (parent?.id || '') + '/'}%` },
				name: undefined
			};
		}
		GroupNodesQuery.fetch({ variables }).then((result) => {
			treeStructs = result.data?.groupList;
			nodeTrees = buildTree(treeStructs, parent);
		});
	};
</script>

<ul class={currentDeep ? '' : 'menu'}>
	{#if nodeTrees}
		{#each nodeTrees as nodeTree}
			<li>
				<a
					class={nodeTree.node?.id === activeGroupId ? 'active' : ''}
					href={null}
					on:click|preventDefault={(e) => {
						if (activeGroupId === nodeTree.node?.id) {
							activeGroupId = undefined;
						} else {
							activeGroupId = nodeTree.node?.id;
						}
						dispatch('change', { activeId: activeGroupId });
					}}
				>
					{nodeTree.node?.name}
				</a>
				{#if $GroupNodesQuery.fetching}
					<MenuTreeLoading />
				{:else if nodeTree.children}
					<GroupTreeMenu
						bind:activeGroupId
						nodeTrees={nodeTree.children}
						currentDeep={currentDeep + 1}
						parent={nodeTree.node}
						{deeps}
						on:change
					/>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
