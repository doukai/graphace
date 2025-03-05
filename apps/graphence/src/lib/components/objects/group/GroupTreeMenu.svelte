<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import {
		type NodeTree,
		type TreeStruct,
		type QueryTreeStructArgs,
		buildTree
	} from '@graphace/graphql';
	import { MenuTreeLoading } from '@graphace/ui';
	import type { StructQueryStores } from '@graphace/ui-graphql';

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

	const { treeQueryStore } = getContext<StructQueryStores>('structQueryStores');

	$: if (treeStructs) {
		nodeTrees = buildTree(treeStructs, parent);
	}

	$: if (parent && activeGroupId && parent?.id === activeGroupId) {
		queryNodes(groupName);
	}

	export const queryNodes = (groupName?: string | null | undefined) => {
		let variables: QueryTreeStructArgs;
		if (groupName) {
			variables = {
				name: { opr: 'LK', val: `%${groupName}%` }
			};
		} else {
			variables = {
				deep: { opr: 'LT', val: currentDeep + deeps },
				path: { opr: 'LK', val: `${(parent?.path || '') + (parent?.id || '') + '/'}%` }
			};
		}
		treeQueryStore.fetch({ fieldName: 'groupList', idName: 'id' }, variables).then((result) => {
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
				{#if $treeQueryStore.isFetching}
					<MenuTreeLoading />
				{:else if nodeTree.children}
					<svelte:self
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
