<script lang="ts">
	import { Card } from '@graphace/ui';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
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

	const components: Record<string, any> = {
		agg: GroupAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
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
