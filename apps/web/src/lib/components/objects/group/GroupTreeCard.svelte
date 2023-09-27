<script lang="ts">
	import { Card } from '@graphace/ui/components/card';
	import GroupTreeMenu from '~/lib/components/objects/group/GroupTreeMenu.svelte';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';

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

	<GroupTreeMenu bind:activeGroupId bind:groupName {currentDeep} {deeps} />
</Card>
