<script lang="ts">
	import type { TreeStruct } from '@graphace/graphql';
	import { Card, SearchInput } from '@graphace/ui';
	import GroupTreeMenu from '~/lib/components/objects/group/GroupTreeMenu.svelte';

	export let treeStructs: (TreeStruct | null | undefined)[] | null | undefined = undefined;
	export let currentDeep = 0;
	export let deeps = 2;
	export let showSearchInput: boolean = true;
	export let activeGroupId: string | null | undefined = undefined;
	export let groupName: string | undefined = undefined;
</script>

<Card>
	{#if showSearchInput}
		<SearchInput
			on:search={(e) => {
				activeGroupId = undefined;
				if (e.detail.value) {
					groupName = e.detail.value;
				} else {
					groupName = undefined;
				}
			}}
		/>
	{/if}
	<div class="divider" />

	<GroupTreeMenu bind:activeGroupId bind:groupName {treeStructs} {currentDeep} {deeps} />
</Card>
