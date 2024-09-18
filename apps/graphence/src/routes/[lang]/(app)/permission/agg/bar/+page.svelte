<script lang="ts">
	import { Card } from '@graphace/ui';
	import PermissionBar from '~/lib/components/objects/permission/PermissionBar.svelte';
	import type { PermissionAggStore } from '~/lib/stores/permission/permissionAggStore';
	import type { PageData } from './$houdini';

	export let data: PageData;
	const {
		selectColumns,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;
	const PermissionAgg = data.PermissionAgg as PermissionAggStore;
</script>

<Card>
	<PermissionBar
		isFetching={$PermissionAgg.isFetching}
		data={$PermissionAgg.data}
		{selectColumns}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => PermissionAgg.fetch(e.detail.selectColumns, e.detail.queryArguments)}
	/>
</Card>
