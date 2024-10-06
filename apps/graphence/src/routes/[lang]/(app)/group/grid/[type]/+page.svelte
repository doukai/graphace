<script lang="ts">
	import { Card } from '@graphace/ui';
	import GroupGrid from '~/lib/components/objects/group/GroupGrid.svelte';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
	import type { GroupQueryStore } from '~/lib/stores/group/groupQueryStore';
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

	const GroupQuery = data.GroupQuery as GroupQueryStore;

	const components: Record<string, any> = {
		mutation: GroupGrid,
		agg: GroupAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$GroupQuery.isFetching}
		connection={$GroupQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => GroupQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
