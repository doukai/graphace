<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import type { RoleAggStore } from '~/lib/stores/role/roleAggStore';
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
	const RoleAgg = data.RoleAgg as RoleAggStore;
</script>

<Card>
	<RoleBar
		isFetching={$RoleAgg.isFetching}
		data={$RoleAgg.data}
		{selectColumns}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RoleAgg.fetch(e.detail.selectColumns, e.detail.queryArguments)}
	/>
</Card>
