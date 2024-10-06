<script lang="ts">
	import { Card } from '@graphace/ui';
	import PermissionGrid from '~/lib/components/objects/permission/PermissionGrid.svelte';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { PermissionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
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

	const PermissionQuery = data.PermissionQuery as PermissionQueryStore;

	const components: Record<string, any> = {
		mutation: PermissionGrid,
		agg: PermissionAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$PermissionQuery.isFetching}
		connection={$PermissionQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => PermissionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
