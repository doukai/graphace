<script lang="ts">
	import { Card } from '@graphace/ui';
	import PermissionBar from '~/lib/components/objects/permission/PermissionBar.svelte';
	import PermissionLine from '~/lib/components/objects/permission/PermissionLine.svelte';
	import PermissionPie from '~/lib/components/objects/permission/PermissionPie.svelte';
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

	const components: Record<string, any> = { bar: PermissionBar, line: PermissionLine, pie: PermissionPie };

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
