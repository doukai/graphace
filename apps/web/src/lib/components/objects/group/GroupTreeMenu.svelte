<script lang="ts">
	import { graphql, GroupNodesQuery$input, Operator } from '$houdini';
	import type { GroupNodesQueryVariables } from './$houdini';
	import { NodeTree, TreeStruct, buildTree } from '@graphace/graphql';
	import { notifications, MenuTreeLoading } from '@graphace/ui';
	import GroupTreeMenu from './GroupTreeMenu.svelte';
	import LL from '$i18n/i18n-svelte';

	export let nodeTrees: NodeTree[] | null | undefined = undefined;
	export let parent: TreeStruct | null | undefined = undefined;
	export let currentDeep = 0;
	export let deeps = 2;
	export let groupName: string | null | undefined = undefined;
	export let activeGroupId: string | null | undefined = undefined;

	export const _GroupNodesQueryVariables: GroupNodesQueryVariables = ({ props }) => {
		return {
		};
	};

	const GroupNodesQuery = graphql(`
		query GroupNodesQuery($path: StringExpression, $deep: IntExpression, $name: StringExpression)
		@load {
			groupList(deep: $deep, path: $path, name: $name) {
				id
				name
				path
				deep
				parentId
			}
		}
	`);

	// $: if (currentDeep === 0) {
	// 	queryNodes(groupName);
	// }

	// $: if (parent?.id === activeGroupId) {
	// 	queryNodes(groupName);
	// }

	// $: if (!nodeTrees || parent?.id === activeGroupId) {
	// 	nodeTrees = buildTree($GroupNodesQuery.data?.groupList, parent);
	// }

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
		GroupNodesQuery.fetch({ variables }).catch((errors) => {
			console.error(errors);
			notifications.error($LL.web.message.requestFailed());
		});
	};
</script>

<ul class={currentDeep ? '' : 'menu'}>
	{#if nodeTrees}
		{#each nodeTrees as nodeTree}
			<li>
				<a
					class={nodeTree.node.id === activeGroupId ? 'active' : ''}
					href={null}
					on:click|preventDefault={(e) => {
						activeGroupId = nodeTree.node.id;
					}}
				>
					{nodeTree.node.name}
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
					/>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
