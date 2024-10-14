<script lang="ts">
	import { Card } from '@graphace/ui';
	import PermissionBar from '~/lib/components/objects/permission/PermissionBar.svelte';
	import PermissionLine from '~/lib/components/objects/permission/PermissionLine.svelte';
	import PermissionPie from '~/lib/components/objects/permission/PermissionPie.svelte';
	import PermissionAggTable from '~/lib/components/objects/permission/PermissionAggTable.svelte';
	import type { PermissionConnectionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
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

	const PermissionConnectionQuery = data.PermissionConnectionQuery as PermissionConnectionQueryStore;

	const components: Record<string, any> = {
		bar: PermissionBar,
		line: PermissionLine,
		pie: PermissionPie,
		table: PermissionAggTable
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$PermissionConnectionQuery.isFetching}
		connection={$PermissionConnectionQuery.response.data?.permissionConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => PermissionConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
