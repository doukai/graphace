<script lang="ts">
	import { Card } from '@graphace/ui';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import type { GroupAggStore } from '~/lib/stores/group/groupAggStore';
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
	const GroupAgg = data.GroupAgg as GroupAggStore;
</script>

<Card>
	<GroupBar
		isFetching={$GroupAgg.isFetching}
		connection={$GroupAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => GroupAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
