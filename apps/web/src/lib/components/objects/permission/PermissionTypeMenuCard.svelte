<script lang="ts">
	import { Card } from '@graphace/ui/components/card';
	import PermissionTypeMenu from '~/lib/components/objects/permission/PermissionTypeMenu.svelte';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';

	export let showSearchInput: boolean = true;
	export let activeTypeName: string | null | undefined = undefined;
	export let typeName: string | null | undefined = undefined;
</script>

<Card>
	{#if showSearchInput}
		<SearchInput
			on:search={(e) => {
				activeTypeName = undefined;
				if (e.detail.value) {
					typeName = e.detail.value;
				} else {
					typeName = undefined;
				}
			}}
		/>
	{/if}
	<div class="divider" />

	<PermissionTypeMenu bind:activeTypeName bind:typeName />
</Card>
