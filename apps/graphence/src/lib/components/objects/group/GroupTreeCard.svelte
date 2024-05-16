<script lang="ts">
	import { Card, SearchInput } from '@graphace/ui';
	import GroupTreeMenu from '~/lib/components/objects/group/GroupTreeMenu.svelte';
	import { Operator, graphql } from '$houdini';
	import type { GroupRootNodesQueryVariables } from './$houdini';

	export let currentDeep = 0;
	export let deeps = 2;
	export let showSearchInput: boolean = true;
	export let activeGroupId: string | null | undefined = undefined;
	export let groupName: string | undefined = undefined;

	export const _GroupRootNodesQueryVariables: GroupRootNodesQueryVariables = ({ props }) => {
		return { deep: { opr: Operator.LT, val: deeps } };
	};

	const GroupRootNodesQuery = graphql(`
		query GroupRootNodesQuery($deep: IntExpression) @load {
			groupList(deep: $deep) {
				id
				name
				path
				deep
				parentId
			}
		}
	`);

	let queryNodes: (groupName?: string | null | undefined) => void;
</script>

<Card>
	{#if showSearchInput}
		<SearchInput
			on:search={(e) => {
				activeGroupId = undefined;
				if (e.detail.value) {
					queryNodes(e.detail.value);
				} else {
					queryNodes();
				}
			}}
		/>
	{/if}
	<div class="divider" />

	<GroupTreeMenu
		bind:activeGroupId
		bind:groupName
		bind:queryNodes
		treeStructs={$GroupRootNodesQuery.data?.groupList}
		{currentDeep}
		{deeps}
		on:change
	/>
</Card>
