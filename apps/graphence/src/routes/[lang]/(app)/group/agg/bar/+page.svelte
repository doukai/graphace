<script lang="ts">
	import { Card } from '@graphace/ui';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import type { GroupAggStore } from '~/lib/stores/group/groupAggStore';
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
	const GroupAgg = data.GroupAgg as GroupAggStore;
</script>

<Card>
	<GroupBar
		isFetching={$GroupAgg.isFetching}
		data={$GroupAgg.data}
		{selectColumns}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => GroupAgg.fetch(e.detail.selectColumns, e.detail.queryArguments)}
	/>
</Card>
