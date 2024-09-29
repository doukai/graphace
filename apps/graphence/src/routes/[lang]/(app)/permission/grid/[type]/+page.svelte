<script lang="ts">
	import { Card } from '@graphace/ui';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { PermissionAggStore } from '~/lib/stores/permission/permissionAggStore';
	import type { PageData } from './$houdini';

	export let data: PageData;

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const PermissionAgg = data.PermissionAgg as PermissionAggStore;

	const components: Record<string, any> = {
		agg: PermissionAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$PermissionAgg.isFetching}
		connection={$PermissionAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => PermissionAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
