<script lang="ts">
	import { getContext } from 'svelte';
	import { Card, SearchInput } from '@graphace/ui';
	import type { StructQueryStores } from '@graphace/ui-graphql';
	import GroupTreeMenu from '~/lib/components/objects/group/GroupTreeMenu.svelte';

	export let currentDeep = 0;
	export let deeps = 2;
	export let showSearchInput: boolean = true;
	export let activeGroupId: string | null | undefined = undefined;
	export let groupName: string | undefined = undefined;

	const { treeQueryStore } = getContext<StructQueryStores>('structQueryStores');
	treeQueryStore.fetch({ fieldName: 'groupList', idName: 'id' }, { deep: { opr: 'LT', val: deeps } });

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

	<GroupTreeMenu bind:activeGroupId bind:groupName treeStructs={$treeQueryStore.response.data?.groupList} {currentDeep} {deeps} on:change bind:queryNodes />
</Card>
